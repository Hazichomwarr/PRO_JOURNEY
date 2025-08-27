import axios from "axios";
import _ from "lodash"; //npm install --save-dev @types/lodash

const url = "https://jsonplaceholder.typicode.com/users/1";

axios
  .get(url)
  .then((res) => {
    console.log("it worked!");
    console.log(res.data);
  })
  .catch((e) => {
    console.log("Error!!!", e);
  });
