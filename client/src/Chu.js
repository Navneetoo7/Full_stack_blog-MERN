import data from "./mock.json";
import moment from "moment";

import React from "react";

function DateFormatter(timestamp) {
  const date = moment(timestamp).format("MM-DD-YYYY");
  return date;
}
const Chu = () => {
  const array = data.data.data;
  const value = array.map((item) => {
    // return DateFormatter(item.createdAt);
    return item.createdAt.slice(0, 10).toString();
  });

  const unique = (value, index, self) => {
    return self.indexOf(value) === index;
  };

  const varifications = [];
  const uniqueAges = value.filter(unique);
  console.log(uniqueAges);
  const rahul = () => {
    for (let i; i < uniqueAges.length; i++) {
      const impactsII = [];
      let impacts = array.filter((data) => {
        if (data.includes(uniqueAges[i])) {
          impactsII.push(data.impactId);
        }
      });
      const id = [];
      let id_value = array.filter((data) => {
        if (data.includes(uniqueAges[i])) {
          if (data.includes(uniqueAges[i])) {
            id.push(data.id);
          }
        }
        console.log(
          impacts,
          "impactsII",
          impactsII,
          "id",
          id,
          "------",
          id_value
        );
      });
    }
  };
  const dataa = uniqueAges[1].length;
  const rahul1 = array.filter((data) => {
    let y = data.createdAt.slice(0, 10).toString();
    if (data.createdAt.slice(0, 10).toString() == dataa.toString()) {
      console.log("data", data);
    }
    if (y.toString() == dataa.toString()) {
      console.log(y.toString(), "data", data);
    }
    console.log(y.toString(), "data");

    data.createdAt.slice(0, 10);
    data.createdAt.slice(0, 10).toString().includes(uniqueAges[0].toString());
    // console.log(data.createdAt.slice(0, 10).toString());
  });
  //   rahul();
  //   subCategory = this.state.filter.filter((coin: any) =>
  //               coin.attributes.sub_category_name.includes(text1)
  //             );
  console.log(rahul1, "jhjhjhjh", dataa);
  const filterdData = array.map((data) => {
    let dict = [];
    return dict.push({
      key: data.createdA,
      value: {
        varifications: data.id,
        impacts: data.impactId,
      },
    });
  });

  console.log("fdfdf", filterdData);

  return (
    <div>
      <h1>ggj</h1>
    </div>
  );
};

export default Chu;
