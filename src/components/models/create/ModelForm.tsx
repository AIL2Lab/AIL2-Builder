'use client' 

import { useForm } from "react-hook-form"
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
import { Agent } from "@/generated/client"
import { ImageUpload } from "@/components/ui/image-upload"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import { useLocale } from "next-intl"
import { createModelApi } from "@/services/models.service"
import { useAuth } from "@/hooks/useAuth"
import { useAppKit } from "@reown/appkit/react"

export function CreateModelForm() {
  const router = useRouter()
  const locale = useLocale()
  const { isAuthenticated } = useAuth()
  const { open } = useAppKit()
  const queryClient = useQueryClient()
  const mutation = useMutation<ApiResponse<Agent>, Error, CreateModelInput>({
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
      toast.error(error.message || "An unexpected error occurred.")
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
  const mockUpload = async (files) => {
    console.log(files);
    return 'https://picsum.photos/seed/design/800/600.jpg'
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>AI模型项目名称</FormLabel>
              <FormControl>
                <Input placeholder="1-12个字母" {...field} />
              </FormControl>
              <FormMessage /> 
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="symbol"
          render={({ field }) => (
            <FormItem>
              <FormLabel>代币名称</FormLabel>
              <FormControl>
                <Input
                  placeholder="3-5个大写英文字母"
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
            <FormItem>
              <FormLabel>AI模型描述</FormLabel>
              <FormControl>
                <Textarea placeholder="描述你的AI模型功能" {...field} />
              </FormControl>
              <FormMessage /> 
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Images</FormLabel>
              <FormControl>
                <ImageUpload
                  value={field.value}
                  onChange={(urls) => field.onChange(urls)}
                  onUpload={mockUpload} // 传入你的真实上传函数
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
            <FormItem>
              <FormLabel>推特链接 (可选)</FormLabel>
              <FormControl>
                <Input placeholder="https://x.com/your_ai_model" {...field} />
              </FormControl>
              <FormMessage /> 
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="telegramLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telegram链接 (可选)</FormLabel>
              <FormControl>
                <Input placeholder="https://t.me/your_project" {...field} />
              </FormControl>
              <FormMessage /> 
            </FormItem>
          )}
        />
        <Button type="submit" disabled={mutation.isPending} className="w-full">
          立即创建
        </Button>
      </form>
    </Form>
  )
}
