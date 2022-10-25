import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import styles from '../styles/Home.module.css';

const Wishlist: NextPage = () => {
  const [books, setBooks] = useState([]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Wishlist - Books</title>
      </Head>

      <main className={styles.main}>
        <div className={styles.list}>
          {books.map((book: any) => {
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
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Wishlist;
