import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import axios from 'axios'
import 'highlight.js/styles/idea.css'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Link, useParams } from 'react-router-dom'
import remarkGfm from 'remark-gfm'
import { blog_delete_, blog_get_ } from '../../configs/api'
import { hljs } from '../../configs/global'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { selectBlog, updateBlog } from '../../stores/blog/blogSlice'
import { selectUser } from '../../stores/user/userSlice'
import Tag from '../Tag/Tag'
import styles from './BlogFull.module.css'

/**
 * 博客完整阅读页，根据路由 id 展示整篇博文
 */
const BlogFull = () => {
  const blog = useAppSelector(selectBlog).data
  const user = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  const params = useParams()
  const [open, setOpen] = useState(false)
  const [markdown, setMarkdown] = useState(blog.markdown)
  const date = new Date(blog.date)

  function fetchBlog() {
    axios.get(blog_get_ + params.id).then((res) => {
      setMarkdown(res.data.data.markdown.replace('<!--truncate-->', ''))
      dispatch(updateBlog(res.data.data))
    })
  }

  function handleClose() {
    setOpen(false)
  }

  function handleAgree() {
    axios.delete(blog_delete_ + params.id, {
      headers: {
        'Authorization': user.data?.token ? user.data?.token : ""
      }
    }).then((res) => {
      if (res.data.code === 204) {
        window.open('/blog/page/1', '_self');
      }
    });
    setOpen(false);
  }

  function doDelete() {
    setOpen(true)
  }

  useEffect(() => {
    // 侧栏跳转或直接用链接访问到此则请求博客
    if (blog._id !== params.id) fetchBlog()
    else {
      // 从预览来的无需请求，在预览页已经设置当前博客到全局变量
      setMarkdown(blog.markdown.replace('<!--truncate-->', ''))
    }
    // 延迟设置代码高亮
    setTimeout(() => {
      document.querySelectorAll('pre code').forEach((el: any) => {
        hljs.highlightElement(el)
        el.style.padding = 0
      })
    }, 200)
  }, [params.id])

  return (
    <div className={styles.full}>
      <h1>{blog.title}</h1>
      <p className={styles.est}>{date.getFullYear()}年{date.getMonth() + 1}月{date.getDate()}日 · 预计阅读时间 {Math.round(blog.markdown.length / 200)} min</p>
      {
        blog.author !== '' &&
        <div className={styles.author}>
          <a href="" target="_blank" rel="noopener noreferrer">
            <img alt='avatar' width='48' height='48' src={blog.avatarUrl} />
          </a>
          <div>
            <a className={styles.avatar_name} href="" target="_blank" rel="noopener noreferrer">
              {blog.author}
            </a>
            <small>{blog.description}</small>
          </div>
        </div>
      }
      <ReactMarkdown className={styles.markdown_body + ' markdown-body'} children={markdown} remarkPlugins={[remarkGfm]} />
      <div className={styles.article_footer}>
        <div>
          {blog.tag[0] !== '' &&
            <>
              <strong>标签：</strong>
              {
                blog.tag.map((t, i) => {
                  return <Tag key={i} to=''>{t}</Tag>
                })
              }
            </>
          }
        </div>
        {user.data?.role === 0 &&
          <div>
            <Link to='/blog-write?edit=true' className={styles.edit}><EditIcon fontSize='small' /><span>编辑此页</span></Link>
            <span className={styles.delete} onClick={doDelete}><DeleteIcon fontSize='small' /><span>删除</span></span>
          </div>
        }
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          删除确认
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            删除后此文将从数据库抹去，不再出现在页面中。你确定要删除这篇博客吗？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={handleAgree} autoFocus>
            确认删除
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default BlogFull