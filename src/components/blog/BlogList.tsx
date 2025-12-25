import { List } from "./List";


interface Rendered {
  rendered: string;
}
interface BlogPost {
  id: number;
  title: Rendered;
  link: string;
  seo_desc: string;
  seo_image: string;     // API 里的图片字段
  release_time: string;  // API 里的时间字段
  categories: number[];
}

const API_URL = "https://www.decentralgpt.org/wp-json/wp/v2/posts?per_page=9999&_fields=id,title,link,seo_desc,seo_image,categories,release_time";
async function getPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch(API_URL, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error('Failed to fetch data');
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}


export default async function BlogList() {
    
    const allPosts = await getPosts();
    return (
        <List allPosts={allPosts} />
    )
}