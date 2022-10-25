import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import styles from '../styles/Home.module.scss';
import { BookSearch } from 'mdi-material-ui';
import Header from './components/Header';

const Home: NextPage = () => {
  const [books, setBooks] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setBooks([]);
    if (!text) return;
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${text}`
    );
    const data = await res.json();
    setBooks(data.items);
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Books to Read</title>
      </Head>

      <Header />

      <main className={styles.main}>
        <form onSubmit={handleSearch} className={styles.search}>
          <input
            type="text"
            placeholder="Search books..."
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <button type="submit" className={styles.searchBtn}>
            Search
            <BookSearch />
          </button>
        </form>
        {loading ? (
          <p className={styles.loading}>Loading...</p>
        ) : (
          <div className={styles.list}>
            {books?.map((book: any) => {
              const { imageLinks, title = '', authors = [] } = book.volumeInfo;
              return (
                <div className={styles.listItem} key={book.id}>
                  <div className={styles.book}>
                    <div className={styles.thumbnail}>
                      <Image
                        layout="fill"
                        src={imageLinks?.thumbnail}
                        alt={title}
                      />
                    </div>
                    <div className={styles.author}>{authors.join(', ')}</div>
                    <div className={styles.wishlistOverlay}>
                      <div className={styles.addToWishlist}>Wishlist</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
