import { useQuery } from "@tanstack/react-query";
import { catalogOptions } from "./productQueries";
import { QueryFeedback } from "./QueryFeedback";
import { Form, Link, useLoaderData, useNavigation } from "react-router";
import type { catalogLoader } from "./loaders";
import { catalogParams } from "./catalogView";
import ProductCard from "./ProductCard";
export default function Catalog() {
  const view = useLoaderData<typeof catalogLoader>();
  const query = useQuery(catalogOptions(view));
  const navigation = useNavigation();
  const search = catalogParams(view).toString();
  const isPending = navigation.state === "loading";
  if (!query.data) return <QueryFeedback query={query} />;
  const { items, total, page, pages } = query.data;
  return (
    <>
      <title>Collection | ShopFront</title>
      <section className="collection-intro">
        <div>
          <p className="eyebrow">The everyday collection</p>
          <h1 tabIndex={-1}>
            Good things,
            <br />
            <span>chosen with care.</span>
          </h1>
          <p>
            Thoughtful essentials for your home, your work,
            <br className="desktop-only" /> and wherever the day takes you.
          </p>
        </div>
        <div className="collection-note">
          <span className="collection-number">01 /</span>
          <p>
            A small collection.
            <br />A little more considered.
          </p>
        </div>
      </section>
      <QueryFeedback query={query} />
      <Form
        method="get"
        className="filter-bar"
        key={search}
        aria-label="Product filters"
      >
        <label>
          Search the collection
          <input
            type="search"
            name="q"
            defaultValue={view.q}
            placeholder="Try a lamp or backpack"
            maxLength={80}
          />
        </label>
        <label>
          Category
          <select name="category" defaultValue={view.category}>
            <option value="">All categories</option>
            <option>Home</option>
            <option>Travel</option>
            <option>Audio</option>
          </select>
        </label>
        <label>
          Sort by
          <select name="sort" defaultValue={view.sort}>
            <option value="featured">Featured</option>
            <option value="name">Name</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </label>
        <button type="submit" disabled={isPending}>
          {isPending ? "Applying…" : "Apply filters"}
        </button>
        <Link className="clear-link" to="/">
          Reset
        </Link>
      </Form>
      <div className="results-heading">
        <p role="status">
          {total}{" "}
          {total === 1 ? "considered essential" : "considered essentials"}
          {view.q && <> matching “{view.q}”</>}
          {view.category && <> · {view.category}</>}
        </p>
        <span>
          Page {page} of {pages}
        </span>
      </div>
      <section
        className="product-grid"
        aria-label="Products"
        aria-busy={isPending}
      >
        {items.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            returnSearch={`?${search}`}
          />
        ))}
      </section>
      {items.length === 0 && (
        <section className="empty-state">
          <h2>No matching products</h2>
          <p>A different search might uncover something good.</p>
          <Link className="button" to="/">
            Explore the collection
          </Link>
        </section>
      )}
      {pages > 1 && (
        <nav className="pagination" aria-label="Catalog pages">
          {Array.from({ length: pages }, (_, i) => i + 1).map((number) => (
            <Link
              key={number}
              aria-label={`Page ${number}`}
              aria-current={number === page ? "page" : undefined}
              to={`/?${catalogParams({ ...view, page: number })}`}
            >
              {number}
            </Link>
          ))}
        </nav>
      )}
    </>
  );
}
