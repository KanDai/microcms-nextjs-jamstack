import styles from '../../styles/Home.module.scss'

// pages/blog/[id].js
export default function BlogId({ blog }) {
    return (
        <main className={styles.main}>
            <h1 className={styles.title}>{blog.title}</h1>
            <p className={styles.publishedAt}>{blog.publishedAt}</p>
            <p className={styles.category}>{blog.category && `${blog.category.label}`}</p>
            <div
                dangerouslySetInnerHTML={{
                    __html: `${blog.body}`,
                }}
                className={styles.post}
            />
        </main>
    );
}

export const getStaticPaths = async () => {
    const key = {
        headers: { "X-API-KEY": process.env.API_KEY },
    };

    const repos = await fetch(
        "https://jamstack-next.microcms.io/api/v1/blog",
        key
    )
        .then((res) => res.json())
        .catch(() => null);

    const paths = repos.contents.map((repo) => `/blog/${repo.id}`);
    return { paths, fallback: false };
};

export const getStaticProps = async (context) => {
    const id = context.params.id;

    const key = {
        headers: { "X-API-KEY": process.env.API_KEY },
    };

    const data = await fetch(
        "https://jamstack-next.microcms.io/api/v1/blog/" + id,
        key
    )
        .then((res) => res.json())
        .catch(() => null);

    return {
        props: {
            blog: data,
        },
    };
};
