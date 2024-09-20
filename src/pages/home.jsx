import BannerImage from "../components/homeBanner";

export default function home() {
  return (
    <div>
      <div>
        <h1>Home</h1>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-8">
            <BannerImage />
          </div>
          <div className="col-sm-4">
            <p className="container-sm">Hello!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
