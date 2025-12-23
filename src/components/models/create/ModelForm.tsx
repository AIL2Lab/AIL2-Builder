'use client' 

import { useForm, type FieldErrors } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"


import { createModelSchema, type CreateModelInput } from "@/lib/validations"
import { ApiResponse } from "@/types/api"
import { Model } from "@/generated/client"
import { ImageUpload } from "@/components/ui/image-upload"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import { useLocale, useTranslations } from "next-intl"
import { createModelApi } from "@/services/api/model"
import { uploadImageApi } from "@/services/upload.service"
import { useAuth } from "@/hooks/useAuth"
import { useAppKit } from "@reown/appkit/react"

export function CreateModelForm() {
  const router = useRouter()
  const locale = useLocale()
  const t = useTranslations("ModelForm")
  const { isAuthenticated } = useAuth()
  const { open } = useAppKit()
  const queryClient = useQueryClient()
  const mutation = useMutation<ApiResponse<Model>, Error, CreateModelInput>({
    mutationFn: (data: CreateModelInput) => createModelApi(data),
    onSuccess: (data) => {
      if (data.code === 201) {
        toast.success(data.message)
        form.reset() 
        queryClient.invalidateQueries({ queryKey: ['models'] })
        router.push(`/${locale}/models`)
      } else {
        toast.error(data.message)
      }
    },
    onError: (error) => {
      toast.error(error.message || t("error.unexpected"))
    },
  })


  const form = useForm<CreateModelInput>({
    resolver: zodResolver(createModelSchema), 
    defaultValues: {
      name: "",
      symbol: "",
      description: "",
      avatar: "",
      twitterLink: "",
      telegramLink: ""
    },
  })

  function onSubmit(values: CreateModelInput) {
    if (!isAuthenticated) {
      open({ view: "Connect" });
      return;
    }
    const { twitterLink, telegramLink, ...restOfValues } = values;
    const createModelData = {
      ...restOfValues,
      socialLinks: JSON.stringify([twitterLink, telegramLink])
    }
    console.log(createModelData);
    mutation.mutate(createModelData)
  }

  const handleUpload = async (file: File) => {
    try {
      const url = await uploadImageApi(file)
      return url
    } catch (error) {
      toast.error(t("error.upload_failed") || "Upload failed")
      throw error
    }
  }

  function onError(errors: FieldErrors<CreateModelInput>) {
    const fieldOrder: (keyof CreateModelInput)[] = [
      "name",
      "symbol",
      "description",
      "avatar",
      "twitterLink",
      "telegramLink",
    ]
    const firstErrorField = fieldOrder.find((field) => errors[field])
    if (!firstErrorField) return
    const element = document.querySelector<HTMLElement>(`[data-field="${firstErrorField}"]`)
    if (!element) return
    element.scrollIntoView({ behavior: "smooth", block: "center" })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem data-field="name">
              <FormLabel>{t("name.label")}</FormLabel>
              <FormControl>
                <Input placeholder={t("name.placeholder")} {...field} />
              </FormControl>
              <FormMessage /> 
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="symbol"
          render={({ field }) => (
            <FormItem data-field="symbol">
              <FormLabel>{t("symbol.label")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("symbol.placeholder")}
                  value={field.value}
                  maxLength={5}
                  onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                />
              </FormControl>
              <FormMessage /> 
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem data-field="description">
              <FormLabel>{t("description.label")}</FormLabel>
              <FormControl>
                <Textarea placeholder={t("description.placeholder")} {...field} />
              </FormControl>
              <FormMessage /> 
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem data-field="avatar">
              <FormLabel>{t("avatar.label")}</FormLabel>
              <FormControl>
                <ImageUpload
                  value={field.value}
                  onChange={(urls) => field.onChange(urls)}
                  onUpload={handleUpload} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="twitterLink"
          render={({ field }) => (
            <FormItem data-field="twitterLink">
              <FormLabel>{t("twitter.label")}</FormLabel>
              <FormControl>
                <Input placeholder={t("twitter.placeholder")} {...field} />
              </FormControl>
              <FormMessage /> 
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="telegramLink"
          render={({ field }) => (
            <FormItem data-field="telegramLink">
              <FormLabel>{t("telegram.label")}</FormLabel>
              <FormControl>
                <Input placeholder={t("telegram.placeholder")} {...field} />
              </FormControl>
              <FormMessage /> 
            </FormItem>
          )}
        />
        <Button type="submit" disabled={mutation.isPending} className="w-full">
          {t("submit")}
        </Button>
      </form>
    </Form>
  )
}
