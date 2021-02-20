public static void main(String[] args) {
    String url = "https://cdn.mdeer.com/data/yqstaticdata.js";
    //创建一个请求
    Http http = Http.create(url)
            .get()
            .timeout(3)
            .send();
 
    //返回请求结果
    String result = http.getResponse().getResult();
 
    //截取返回的callback
    result = result.substring(19,result.length() - 1);
    System.out.println(result);
}
