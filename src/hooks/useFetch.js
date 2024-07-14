import useSWR from 'swr';

export default function useFetch(url) {
    const request =  async (url) => fetch(url).then(response => response.json());
    const { data, mutate } = useSWR(url, url => request(url));

    return {data, mutate};
}