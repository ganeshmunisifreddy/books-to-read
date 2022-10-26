import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import styles from '../styles/Home.module.scss';
import { BookSearch } from 'mdi-material-ui';
import Header from './components/Header';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';

const Home: NextPage = (props: any) => {
  const [books, setBooks] = useState(props.books);
  const [text, setText] = useState<string>(props.q);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { q } = router.query;

  const handleSearch = async (e: any) => {
    e.preventDefault();
    if (!text) return;
    router.push(`/?q=${text}`, undefined, { shallow: true });
    fetchBooks();
  };

  const fetchBooks = async () => {
    setLoading(true);
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${q}`
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
            value={text}
            placeholder="Search books..."
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <Button type="submit" className={styles.searchBtn}>
            Search
            <BookSearch />
          </Button>
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
                      <Button className={styles.addToWishlist}>Wishlist</Button>
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

export async function getServerSideProps(context: any) {
  const { query } = context;
  let data = [];
  if (query.q) {
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${query.q}`
    );
    data = await res.json();
  }
  return {
    props: {
      books: data.items?.length ? data.items : [],
      q: query.q ? query.q : '',
    },
  };
}
