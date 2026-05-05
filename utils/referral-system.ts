import { REFERRAL_REWARDS, getReferralBonus, getUserLevel } from "./user-levels"

export interface ReferralValidation {
  isValid: boolean
  message: string
  referrerName?: string
  welcomeBonus?: number
}

export function createReferralCode(userId: string, userName: string): string {
  const prefix = "CN"
  const userHash = userName.split("").reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0)
    return a & a
  }, 0)
  const timeHash = Date.now().toString(36).slice(-3)
  const code = Math.abs(userHash).toString(36).substring(0, 3).toUpperCase() + timeHash.toUpperCase()
  return prefix + code
}

export function validateReferralCode(code: string, currentUserId?: string): ReferralValidation {
  if (!code || code.length < 5) {
    return {
      isValid: false,
      message: "올바른 초대 코드를 입력해주세요.",
    }
  }

  if (!code.startsWith("CN")) {
    return {
      isValid: false,
      message: "유효하지 않은 초대 코드 형식입니다.",
    }
  }

  try {
    // 모든 사용자의 포인트 데이터에서 해당 초대 코드를 가진 사용자 찾기
    const users = JSON.parse(localStorage.getItem("coinname_users") || "[]")
    let referrerUser = null

    for (const user of users) {
      try {
        const userPointsData = localStorage.getItem(`coinname_user_points_${user.id}`)
        if (userPointsData) {
          const pointsData = JSON.parse(userPointsData)
          if (pointsData.referralCode === code) {
            referrerUser = user
            break
          }
        }
      } catch (error) {
        continue
      }
    }

    if (!referrerUser) {
      return {
        isValid: false,
        message: "존재하지 않는 초대 코드입니다.",
      }
    }

    // 자기 자신의 코드인지 확인
    if (currentUserId && referrerUser.id === currentUserId) {
      return {
        isValid: false,
        message: "자신의 초대 코드는 사용할 수 없습니다.",
      }
    }

    // 초대 제한 확인
    const referrerPointsData = JSON.parse(localStorage.getItem(`coinname_user_points_${referrerUser.id}`) || "{}")
    const referralCount = referrerPointsData.referrals?.length || 0

    if (referralCount >= REFERRAL_REWARDS.maxReferrals) {
      return {
        isValid: false,
        message: "이 사용자는 최대 초대 한도에 도달했습니다.",
      }
    }

    return {
      isValid: true,
      message: `${referrerUser.name}님의 초대로 가입하시면 ${REFERRAL_REWARDS.referredPoints}P를 받습니다!`,
      referrerName: referrerUser.name,
      welcomeBonus: REFERRAL_REWARDS.referredPoints,
    }
  } catch (error) {
    console.error("Error validating referral code:", error)
    return {
      isValid: false,
      message: "초대 코드 검증 중 오류가 발생했습니다.",
    }
  }
}

export function processReferralReward(referralCode: string, newUserId: string, newUserName: string): boolean {
  try {
    // 초대자 찾기
    const users = JSON.parse(localStorage.getItem("coinname_users") || "[]")
    let referrerUser = null

    for (const user of users) {
      try {
        const userPointsData = localStorage.getItem(`coinname_user_points_${user.id}`)
        if (userPointsData) {
          const pointsData = JSON.parse(userPointsData)
          if (pointsData.referralCode === referralCode) {
            referrerUser = user
            break
          }
        }
      } catch (error) {
        continue
      }
    }

    if (!referrerUser) {
      return false
    }

    // 초대자 포인트 데이터 업데이트
    const referrerPointsData = JSON.parse(localStorage.getItem(`coinname_user_points_${referrerUser.id}`) || "{}")
    const referrerLevel = getUserLevel(referrerPointsData.totalPoints || 0)
    const bonusPercentage = getReferralBonus(referrerLevel)
    const basePoints = REFERRAL_REWARDS.referrerPoints
    const bonusPoints = Math.floor(basePoints * (bonusPercentage / 100))
    const totalReferrerPoints = basePoints + bonusPoints

    // 새로운 초대 기록 추가
    const newReferral = {
      id: `ref_${Date.now()}`,
      referrerId: referrerUser.id,
      referredUserId: newUserId,
      referredUserName: newUserName,
      pointsEarned: totalReferrerPoints,
      status: "completed",
      createdAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
    }

    const updatedReferrerData = {
      ...referrerPointsData,
      totalPoints: (referrerPointsData.totalPoints || 0) + totalReferrerPoints,
      referrals: [...(referrerPointsData.referrals || []), newReferral],
      pointsHistory: [
        {
          id: `history_${Date.now()}`,
          type: "earned",
          amount: totalReferrerPoints,
          reason: `친구 초대 보상 (${newUserName})${bonusPoints > 0 ? ` +${bonusPercentage}% 보너스` : ""}`,
          referralId: newReferral.id,
          createdAt: new Date().toISOString(),
        },
        ...(referrerPointsData.pointsHistory || []),
      ],
    }

    localStorage.setItem(`coinname_user_points_${referrerUser.id}`, JSON.stringify(updatedReferrerData))

    // 피초대자 포인트 데이터 업데이트 (웰컴 보너스)
    const newUserPointsData = JSON.parse(localStorage.getItem(`coinname_user_points_${newUserId}`) || "{}")
    const updatedNewUserData = {
      ...newUserPointsData,
      totalPoints: (newUserPointsData.totalPoints || 0) + REFERRAL_REWARDS.referredPoints,
      pointsHistory: [
        {
          id: `history_${Date.now() + 1}`,
          type: "earned",
          amount: REFERRAL_REWARDS.referredPoints,
          reason: `가입 축하 보너스 (${referrerUser.name}님 초대)`,
          createdAt: new Date().toISOString(),
        },
        ...(newUserPointsData.pointsHistory || []),
      ],
    }

    localStorage.setItem(`coinname_user_points_${newUserId}`, JSON.stringify(updatedNewUserData))

    return true
  } catch (error) {
    console.error("Error processing referral reward:", error)
    return false
  }
}
