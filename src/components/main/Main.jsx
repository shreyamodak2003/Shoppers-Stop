import React,{useEffect,useRef,useState}  from "react";
import "./Main.css"
import Swiper from "swiper"
import "swiper/css"
import { Navigation, Pagination } from "swiper/modules"
import useFeatchData from "../../custom/useFetchData"
import {useNavigate} from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Main(){
    const {data, loading, error} = useFeatchData(
        "https://fakestoreapi.com/products"
    )

    const m_data = data.filter((el) => el.category === "men's clothing")
    const f_data = data.filter((el) => el.category === "women's clothing")
  


    return(
        <section>
            <HeroSlide/>
            <h3 className="text-center m-4">Best Seller Men's</h3>
            <SwipeItem props={m_data} />
            <h3 className="text-center m-4">Best Seller Women's</h3>
            <SwipeItem props={f_data} />
            <h3 className="text-center m-4">About Us</h3>
            <AboutUs/>
            <h3 className="text-center m-4">Frequently Asked Questions</h3>
            <Faq/>
        </section>
    )
}


// Hero Section
export function HeroSlide(){
    const gotoTop = useRef(null);

    const handleGoToTop = () => {
        gotoTop.current.scrollIntoView({ behavior: "smooth" })
    }

    return(
        <>
            <div ref={gotoTop} id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="https://t4.ftcdn.net/jpg/06/49/86/29/360_F_649862937_FlzhhgkLMzNIUoqhaspkT23Uyc6TS1Vg.jpg" className="d-block w-100" alt="..." style={{ filter: `grayscale(100%)` }}/>
                    </div>
                    <div className="carousel-item">
                        <img src="https://img.freepik.com/premium-photo/men-s-clothing-hanger-fashion-store_795422-8373.jpg" className="d-block w-100" alt="... " style={{ filter: `grayscale(100%)` }}/>
                    </div>
                    <div className="carousel-item">
                        <img src="https://www.kgkgroup.com/wp-content/uploads/2020/07/Handling-Excess-Jewellery-Inventory-1249-x-576-1.jpg" className="d-block w-100" alt="... " style={{ filter: `grayscale(100%)` }}/>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div className="go-to-top">
                <button className="btn btn-dark" onClick={handleGoToTop}>
                    <i class="bi bi-arrow-up-circle-fill"></i>
                </button>
            </div>
        </>
    )
}

//Swiper function
export function SwipeItem({ props }) {
    const [cartdata, setCartData] = useState(
      JSON.parse(localStorage.getItem("shoppify-cart")) || []
    );
    const navigate = useNavigate();
  
    const handleAddtoCart = (data) => {
      const c_data = [...cartdata, data];
      setCartData(c_data);
      localStorage.setItem("shoppify-cart", JSON.stringify(c_data));
      toast.success("Added to Cart !");
    };
  
    useEffect(() => {
      new Swiper(".swiper", {
        modules: [Navigation, Pagination],
        slidesPerView: 4,
        spaceBetween: 30,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        breakpoints: {
          200: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          450: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
  
          1000: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        },
      });
    }, []);
  
    return (
      <>
        <div className="swiper">
          <div className="swiper-wrapper">
            {/* Slides */}
            {props?.map((el) => (
              <div className="swiper-slide" key={el.id}>
                <img src={el.image} alt={el.title} />
                <div className="swiper-slide-info">
                  <span>{el.category}</span>
                  <h6 class="card-title">{el.title.substring(0, 40)}</h6>
                  <div className="d-flex">
                    Price :{" "}
                    <s style={{ color: "grey" }}>
                      $ {Math.round(el.price) * 80 + 236}
                    </s>
                    &nbsp;
                    <h5>$ {Math.round(el.price) * 80}</h5>
                  </div>
                  <div className="d-flex mt-5">
                    <button
                      className="btn btn-secondary w-100"
                      onClick={() => navigate(`/product/${el.id}`)}
                    >
                      <i class="bi bi-eye"></i>
                    </button>
                    &nbsp;
                    <button
                      className="btn btn-secondary w-100"
                      onClick={() => handleAddtoCart(el)}
                    >
                      <i class="bi bi-cart"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="swiper-pagination"></div>
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
        </div>
        <ToastContainer />
      </>
    )
  }

//FAQ
export function Faq() {
    return (
        <div className="container">
            <div class="accordion accordion-flush" id="accordionFlushExample">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingOne">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            How can I track my order?
                        </button>
                    </h2>
                    <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body">
                            We've made order tracking easy for you! Once your order has been
                            processed and shipped, you will receive a confirmation email
                            containing a tracking number. You can use this tracking number to
                            monitor the status of your shipment on our website. Simply
                            navigate to the "Track Order" section, enter your tracking number,
                            and you'll get real-time updates on the whereabouts of your
                            package.
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingTwo">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                            What is your return policy?
                        </button>
                    </h2>
                    <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body">
                            We want you to be completely satisfied with your purchase. If for
                            any reason you're not happy with your order, we offer a
                            hassle-free return policy. You can return any unused or defective
                            items within 30 days of delivery for a full refund or exchange.
                            Please make sure the items are in their original packaging with
                            all tags attached. To initiate a return, simply contact our
                            customer support team, and they will guide you through the
                            process.
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingThree">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                            Is it safe to shop on your website?
                        </button>
                    </h2>
                    <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body">
                            Absolutely! The security of your personal information is our top
                            priority. Our website employs state-of-the-art encryption
                            technology to ensure that all your data, including payment
                            details, is protected and kept confidential. Additionally, we
                            never store your credit card information on our servers, making
                            your online transactions secure. You can shop with peace of mind
                            knowing that your privacy and security are our utmost concern.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// About Section
export function AboutUs(){
    return(
        <div className="about-main container">
          <div className="about-img">
            <img src="https://www.zuplic.com/wp-content/uploads/2018/07/eCommerce-Animated-GIF.gif" className="img-fluid rounded-start" alt="about us" />
          </div>

          <div className="about-text">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt architecto ipsa tempore ullam exercitationem in reprehenderit minima et? Minus necessitatibus expedita debitis explicabo, odit deleniti voluptates pariatur dicta laboriosam repudiandae ipsum quisquam suscipit aperiam officiis sint commodi quas asperiores voluptas labore id aliquam, numquam ratione quo! Repellat suscipit rem autem!
            </p>
          </div>
        </div>
    )
}
































