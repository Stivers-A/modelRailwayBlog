import BannerImage from "../components/homeBanner";

export default function home() {
  return (
    <div>
      <div >
        <h1>Home</h1>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-8" id="remove-all-margin-padding">
            <BannerImage />
          </div>
          <div className="col-sm-4" >
            <p id='text'>
              Hello!
              <br></br>
              Welcome to my model railway, where we journey back to the
              sun-soaked landscapes of 1950s Southern California. In this blog,
              we dive into the world of N scale model trains,and the process of
              making a model railway recreating the vibrant railroads of
              mid-century California. The posts document my journey as I make my
              first model railway.
              <br></br>
              The 1950s was a transformative decade for
              railroads, as steam engines gave way to sleek diesel locomotives,
              and California’s rapid growth created a rich tapestry of urban and
              rural settings for rail lines to traverse. While my layout rests
              on a two by four board, my goal for it is to have it represent a
              slice of that tapestry in my home.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
