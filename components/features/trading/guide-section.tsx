import { guideSteps } from '@/lib/features/trading/exchanges'
import { CheckCircle } from 'lucide-react'

export function GuideSection() {
  return (
    <section id="guide" className="py-24 bg-secondary/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            가입 가이드
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            간단한 5단계로 암호화폐 거래를 시작하세요.
            레퍼럴 링크를 통해 자동으로 최대 혜택이 적용됩니다.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border md:left-1/2 md:-translate-x-0.5" />

            <div className="space-y-12">
              {guideSteps.map((step, index) => (
                <div
                  key={step.step}
                  className={`relative flex items-start gap-6 md:gap-12 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Step number */}
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold md:absolute md:left-1/2 md:-translate-x-1/2">
                    {step.step}
                  </div>

                  {/* Content */}
                  <div className={`flex-1 pb-8 md:w-1/2 ${
                    index % 2 === 0 ? 'md:pr-20 md:text-right' : 'md:pl-20'
                  }`}>
                    <div className="rounded-xl border border-border bg-card p-6">
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Spacer for alternate layout */}
                  <div className="hidden md:block md:w-1/2" />
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="mt-16 rounded-2xl border border-primary/30 bg-primary/5 p-8">
            <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-primary" />
              가입 시 알아두면 좋은 팁
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                <p className="text-muted-foreground">
                  <span className="text-foreground font-medium">레퍼럴 링크 확인:</span> 가입 전 레퍼럴 코드가 자동 입력되었는지 확인하세요.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                <p className="text-muted-foreground">
                  <span className="text-foreground font-medium">KYC 인증:</span> 대부분의 거래소에서 신원 인증(KYC)을 요구합니다. 미리 신분증을 준비하세요.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                <p className="text-muted-foreground">
                  <span className="text-foreground font-medium">2FA 설정:</span> 계정 보안을 위해 반드시 2단계 인증(Google Authenticator 등)을 설정하세요.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                <p className="text-muted-foreground">
                  <span className="text-foreground font-medium">소액 시작:</span> 처음에는 소액으로 거래를 시작하여 플랫폼에 익숙해지세요.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
