import crawling_server_client as client

def test_basic():
    cnt_before = client.count_items()
    urls = ["a", "b"]
    client.add_items(urls)
    cnt_after = client.count_items()
    assert cnt_after == cnt_before + 2
    client.delete_items(urls)
    cnt_last = client.count_items()
    assert cnt_last == cnt_before
    print('test_basic passed!')

if __name__ == "__main__":
    test_basic()
