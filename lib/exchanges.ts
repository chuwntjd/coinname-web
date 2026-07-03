export interface Exchange {
  id: string
  name: string
  logo: string
  feeDiscount: string
  bonus: string
  features: string[]
  rating: number
  referralLink: string
  description: string
  spotFee: string
  futuresFee: string
  rank: number
  featured?: boolean
}

export const exchanges: Exchange[] = [
  {
    id: 'bybit',
    name: 'Bybit',
    logo: '/logos/bybit.svg',
    feeDiscount: '최대 20%',
    bonus: '최대 $30,000 USDT',
    features: ['파생상품 특화', '빠른 체결', '강력한 보안'],
    rating: 4.7,
    referralLink: 'https://partner.bybit.com/b/54830',
    description: '파생상품 거래에 특화된 거래소로 빠른 체결 속도를 제공합니다.',
    spotFee: '0.1%',
    futuresFee: '0.01%/0.06%',
    rank: 1,
    featured: true,
  },
  {
    id: 'binance',
    name: 'Binance',
    logo: '/logos/binance.svg',
    feeDiscount: '최대 20%',
    bonus: '최대 $100 USDT',
    features: ['세계 1위 거래소', '높은 유동성', '다양한 서비스'],
    rating: 4.9,
    referralLink: 'https://www.binance.com/register?ref=COINNAME',
    description: '세계 최대 암호화폐 거래소로 가장 많은 거래량과 유동성을 자랑합니다.',
    spotFee: '0.1%',
    futuresFee: '0.02%/0.04%',
    rank: 2,
  },
  {
    id: 'okx',
    name: 'OKX',
    logo: '/logos/okx.svg',
    feeDiscount: '최대 20%',
    bonus: '최대 $10,000 USDT',
    features: ['낮은 수수료', '다양한 코인', '안정적인 시스템'],
    rating: 4.8,
    referralLink: 'https://www.okx.com/join/61679091',
    description: '세계 3대 거래소 중 하나로 다양한 암호화폐와 파생상품 거래를 지원합니다.',
    spotFee: '0.08%',
    futuresFee: '0.02%/0.05%', 
    rank: 3,
  },
  {
    id: 'bitget',
    name: 'Bitget',
    logo: '/logos/bitget.svg',
    feeDiscount: '최대 20%',
    bonus: '최대 $8,000 USDT',
    features: ['카피트레이딩', '낮은 수수료', '한국어 지원'],
    rating: 4.6,
    referralLink: 'https://www.bitget.com/referral/register?clacCode=REF123',
    description: '카피트레이딩 기능이 강점인 거래소로 초보자도 쉽게 시작할 수 있습니다.',
    spotFee: '0.1%',
    futuresFee: '0.02%/0.06%',
    rank: 4,
  },
  {
    id: 'deepcoin',
    name: 'Deepcoin',
    logo: '/logos/deepcoin.svg',
    feeDiscount: '최대 30%',
    bonus: '최대 $5,000 USDT',
    features: ['높은 할인율', '신규 코인 상장', '이벤트 다수'],
    rating: 4.3,
    referralLink: 'https://www.deepcoin.com/invite?ref=DEEP123',
    description: '높은 수수료 할인율과 다양한 이벤트를 제공하는 신흥 거래소입니다.',
    spotFee: '0.1%',
    futuresFee: '0.02%/0.05%',
    rank: 5,
  },
  {
    id: 'gateio',
    name: 'Gate.io',
    logo: '/logos/gateio.svg',
    feeDiscount: '최대 20%',
    bonus: '최대 $5,000 USDT',
    features: ['다양한 알트코인', '오래된 역사', '안정적인 운영'],
    rating: 4.4,
    referralLink: 'https://www.gate.io/signup?ref=GATE123',
    description: '2013년 설립된 오래된 거래소로 다양한 알트코인을 지원합니다.',
    spotFee: '0.2%',
    futuresFee: '0.02%/0.05%',
    rank: 6,
  },
]

export const guideSteps = [
  {
    step: 1,
    title: '거래소 선택',
    description: '본 사이트의 비교표를 참고하여 본인에게 맞는 거래소를 선택하세요.',
  },
  {
    step: 2,
    title: '레퍼럴 링크 클릭',
    description: '원하는 거래소의 "가입하기" 버튼을 클릭하여 레퍼럴 혜택을 자동 적용하세요.',
  },
  {
    step: 3,
    title: '회원가입',
    description: '이메일 또는 휴대폰 번호로 계정을 생성하고 이메일/SMS 인증을 완료하세요.',
  },
  {
    step: 4,
    title: 'KYC 인증',
    description: '신원 확인(KYC)을 완료하여 모든 기능과 출금 한도를 해제하세요.',
  },
  {
    step: 5,
    title: '입금 및 거래 시작',
    description: '원화 또는 암호화폐를 입금하고 수수료 할인 혜택을 받으며 거래를 시작하세요.',
  },
]

export const tips = [
  {
    title: '레퍼럴 링크 확인',
    description: '가입 전 레퍼럴 코드가 자동 입력되었는지 확인하세요.',
  },
  {
    title: 'KYC 인증',
    description: '대부분의 거래소에서 신원 인증(KYC)을 요구합니다. 미리 신분증을 준비하세요.',
  },
  {
    title: '2FA 설정',
    description: '계정 보안을 위해 반드시 2단계 인증(Google Authenticator 등)을 설정하세요.',
  },
  {
    title: '소액 시작',
    description: '처음에는 소액으로 거래를 시작하여 플랫폼에 익숙해지세요.',
  },
]
