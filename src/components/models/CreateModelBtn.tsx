'use client'
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useLocale } from "next-intl";

export default function CreateModelBtn() {
    const router = useRouter()
    const locale = useLocale()
    const goCreateModel = () => {
        router.push(`/${locale}/models/create`)
    }
  return <Button onClick={goCreateModel}>创建AI模型</Button>;
}
