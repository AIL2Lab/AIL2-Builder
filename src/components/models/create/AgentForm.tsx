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


import { createAgentSchema, type CreateAgentInput } from "@/lib/validations"
import { createAgent } from "@/actions/agents"
import { ApiResponse } from "@/types/response.type"
import { Agent } from "@/generated/client"
import { ImageUpload } from "@/components/ui/image-upload"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import { useLocale } from "next-intl"

export function CreateAgentForm() {
  const router = useRouter()
  const locale = useLocale()
  const queryClient = useQueryClient()
  const mutation = useMutation<ApiResponse<Agent>, Error, CreateAgentInput>({
    mutationFn: (data: CreateAgentInput) => createAgent(data as any),
    onSuccess: (data) => {
      if (data.code === 201) {
        toast.success(data.message)
        form.reset() 
        // 3. 使 'agents' 列表的缓存失效，触发列表页面重新获取数据
        queryClient.invalidateQueries({ queryKey: ['agents'] })
        router.push(`/${locale}/models`)
      } else {
        toast.error(data.message)
      }
    },
    onError: (error) => {
      toast.error(error.message || "An unexpected error occurred.")
    },
  })


  const form = useForm<CreateAgentInput>({
    resolver: zodResolver(createAgentSchema), 
    defaultValues: {
      name: "",
      symbol: "",
      description: "",
      avatar: "",
      twitterLink: "",
      telegramLink: ""
    },
  })

  
  function onSubmit(values: CreateAgentInput) {
    const { twitterLink, telegramLink, ...restOfValues } = values;
    const createAgentData = {
      ...restOfValues,
      socialLinks: JSON.stringify([twitterLink, telegramLink])
    }
    console.log(createAgentData);
    mutation.mutate(createAgentData)
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
                <Input placeholder="3-5个大写英文字母" {...field} />
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
