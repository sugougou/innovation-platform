import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BlogType } from '../../configs/types'
import { blog_ } from '../../configs/api'
import axios from 'axios'
import BlogPreview from '../BlogPreview/BlogPreview'

/**
 * 博客二级页面，根据路由页码显示对应页内容。嵌在 /blog 页面中。
 */
const BlogPage = () => {
  const params = useParams()
  const [blogs, setBlogs] = useState<BlogType[]>([])

  function fetchBlog() {
    axios.get(blog_ + `?size=${5}&skip=${(Number(params.page) - 1) * 5}`).then((res) => {
      setBlogs(res.data.data);
    });
  }

  useEffect(() => {
    fetchBlog()
  }, [params.page])

  return (
    <div>
      {
        blogs.map((e) => {
          return <BlogPreview key={e._id} blog={e} />
        })
      }
    </div>
  )
}

export default BlogPage