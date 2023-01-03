$(function () {
  $.ajax({
    url: "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-071?Authorization=CWB-CED69085-C63C-4191-8B69-D7BB857D944F&format=JSON&locationName=%E6%96%B0%E8%8E%8A%E5%8D%80&elementName=T",
    method: "GET",
    dataType: "JSON",
    // data:post才會用到

    success: function (res) {
      console.log(res.records.locations[0].locationsName); //台北市
      console.log(res.records.locations[0].location[0].locationName); //新莊區
      console.log(
        res.records.locations[0].location[0].weatherElement[0].time[0]
          .elementValue[0].value
      ); //溫度
      console.log(res);
      $("#city_name").html(res.records.locations[0].locationsName);
      $("#district").html(res.records.locations[0].location[0].locationName);
      $("#tempture").html(
        res.records.locations[0].location[0].weatherElement[0].time[0]
          .elementValue[0].value + "&#176"
      );
      let week = ["MON", "TUE", "WEN", "THU", "FRI"];
      const html1 = `<div class="d-flex flex-column block"><small class="text-muted mb-0">`;
      const html2 = `</small><div class="text-center"><img class="symbol-img" src="`;
      const html3 = `"></div><h6><strong>`;
      const html4 = `&#176;</strong></h6></div>`;
      let weather_html = ""; //儲存html
      let j = 0;
      let img = "";

      for (let i = 1; i < 10; i += 2) {
        let tempture =
          res.records.locations[0].location[0].weatherElement[0].time[i]
            .elementValue[0].value;
        if (tempture >= 18) {
          img = "https://i.imgur.com/Shrg84B.png";
        } else {
          img = "https://i.imgur.com/BeWfUuG.png";
        }

        weather_html =
          weather_html +
          html1 +
          week[j] +
          html2 +
          img +
          html3 +
          tempture +
          html4;
        j++;
      }
      console.log(weather_html);
      $("#weekday").html(weather_html);
    },
    error: function (err) {
      console.log(err);
    },
  });
});
