import { Search } from "lucide-react";
import Form from "next/form";
import SearchFormReset from "./SearchFormReset";

export default function SearchForm({ query }: { query: string }) {
  return (
    <Form action="/" scroll={false} className="search-form">
      <input
        type="text"
        className="search-input"
        placeholder="Search Startups"
        name="query"
        defaultValue={query}
      />

      <div className="flex gap-2">
        {query && <SearchFormReset />}
        <button type="submit" className="search-btn text-white">
          <Search className="size-5" />
        </button>
      </div>
    </Form>
  );
}
