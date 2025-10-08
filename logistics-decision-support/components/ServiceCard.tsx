import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ComponentType, SVGProps } from "react"

export default function ServiceCard({
  title,
  description,
  icon: Icon,
}: {
  title: string
  description: string
  icon?: ComponentType<SVGProps<SVGSVGElement>>
}) {
  return (
    <Card className="h-full shadow-sm">
      <CardHeader className="flex flex-row items-center gap-3">
        {Icon ? (
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
            <Icon className="h-5 w-5 text-muted-foreground" />
          </div>
        ) : null}
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
