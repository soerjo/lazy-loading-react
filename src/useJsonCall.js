import { useEffect, useState } from "react";
import axios from "axios";

function useJsonCall(query, pageNumber) {
  const [value, setvalue] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  let nextPage;
  let url;
  if (!query) {
    url = `https://api.pexels.com/v1/search?query=art&per_page=30`;
  } else if (!nextPage) {
    url = `https://api.pexels.com/v1/search?query=${query}&per_page=30`;
  } else {
    url = nextPage;
  }

  useEffect(() => {
    setisLoading(true);
    const CancelToken = axios.CancelToken;
    let cancel;

    console.log("isi query", query);
    axios({
      method: "GET",
      url: url,
      headers: {
        Authorization:
          "563492ad6f917000010000014f7d500505bf43fc9580337495bc9580",
      },
      //   url: `https://jsonplaceholder.typicode.com/comments?name_like=${query}&_page=${pageNumber}&_limit=30`,
      cancelToken: new CancelToken((c) => (cancel = c)),
    })
      .then(function (response) {
        console.log("load api", url);
        nextPage = response.data.next_page;
        if (value.length < response.data.total_results) {
          setvalue((prev) => [
            ...prev,
            ...response.data.photos.map((data) => {
              return {
                id: data.id,
                src: data.src.medium,
              };
            }),
          ]);
        }
        setisLoading(false);
      })
      .catch(function (error) {
        if (axios.isCancel(error)) {
          // setnextPage([]);
          setvalue([]);
          return;
        }
        console.log(error);
      });

    return () => {
      cancel();
    };
  }, [query, pageNumber]);

  return [value, isLoading];
}

export default useJsonCall;
