import { guideSteps, tips } from "@/lib/exchanges"
import { CheckCircle, Lightbulb } from "lucide-react"

export function GuideSection() {
  return (
    <section id="guide" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">가입 가이드</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            간단한 5단계로 암호화폐 거래를 시작하세요. 레퍼럴 링크를 통해 자동으로 최대 혜택이 적용됩니다.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Timeline */}
          <div className="space-y-0 mb-16">
            {guideSteps.map((step, index) => (
              <div key={step.step} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-lg shrink-0">
                    {step.step}
                  </div>
                  {index < guideSteps.length - 1 && (
                    <div className="w-0.5 h-16 bg-orange-500/30" />
                  )}
                </div>
                <div className="pb-8 flex-1">
                  <h3 className="font-semibold text-xl mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Tips */}
          <div className="p-6 rounded-2xl bg-card border">
            <h3 className="flex items-center gap-2 font-semibold text-lg mb-6">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              가입 시 알아두면 좋은 팁
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {tips.map((tip) => (
                <div key={tip.title} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium">{tip.title}</p>
                    <p className="text-sm text-muted-foreground">{tip.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
