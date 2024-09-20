import BannerImage from "../components/homeBanner";

export default function home  (){
return (
    
     <div>

          <div>
          <h1>Home</h1>
          </div>
          <div className="container-fluid">
          <div className="container-sm remove-all-margin-padding" >
          <BannerImage />
          </div>
          <div className="container-sm remove-all-margin-padding">
               <p>Hello!</p>
          </div>
          </div>
     </div>
)
}
