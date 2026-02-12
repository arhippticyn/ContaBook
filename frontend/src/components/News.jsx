import React from 'react'
import styles from '../styles/Home.module.css'
import { FaSearch } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { selectIsRefreshing, selectNews } from '../redux/selectors.js'
import { GetNews } from '../redux/operationHome.js'
import { RotatingLines } from 'react-loader-spinner'

const News = () => {
  const news = useSelector(selectNews)
  const IsRefreshing = useSelector(selectIsRefreshing)
  const dispatch = useDispatch()
  const handleSearch = e => {
    e.preventDefault()
    const form = e.target
    const search = form.elements.search.value
    dispatch(GetNews(search))
    form.reset()
  }
  return (
    <div className={styles.News}>
      <form action="" className={styles.formSearch} onSubmit={handleSearch}>
        <input
          type="search"
          className={styles.inputSearch}
          name="search"
          placeholder="search..."
          id=""
        />
        <button type="submit" className={styles.btnSearch}>
          <FaSearch />
        </button>

        {IsRefreshing ? (
          <RotatingLines
            visible={true}
            height="96"
            width="96"
            color="grey"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        ) : (
          <ul className={styles.NewsList}>
            {news.map(newsItem => {
              return (
                <li className={styles.NewsItem}>
                  <div className={styles.NewsItemImage}>
                    <img
                      src={newsItem.urlToImage}
                      alt={newsItem.title}
                      className={styles.NewsItemImg}
                    />
                  </div>
                  <div className={styles.NewsInfo}>
                    <span className={styles.NewsItemAuthor}>
                      {newsItem.author} <span>{newsItem.publishedAt}</span>
                    </span>
                    <h2 className={styles.NewsItemTitle}>{newsItem.title}</h2>
                    <p className={styles.NewsItemDescr}>
                      {newsItem.description}
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </form>
    </div>
  )
}

export default News
