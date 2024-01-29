import { useCallback } from "react";
import useRazorpay from "react-razorpay";
import { useSelector} from "react-redux";

export default function MakePayments() {
    var user=useSelector((state)=>state.user)
    var userdata=Object.values(user)[0]
    const products=useSelector((state)=>state.cart);
    const productList=Object.values(products)

    let total =productList.reduce((a,b)=>{
        return a+parseInt(b.offerprice)*b.qty;
        

    },0);


    const [Razorpay] = useRazorpay();

  const handlePayment = useCallback(async() => {
    //const order = await createOrder(params);

    const options = {
      key: "rzp_test_GQ6XaPC6gMPNwH",
      amount: total*100,
      currency: "INR",
      name: "Baba Traders",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      //order_id: order.id,
      handler: (res) => {
        console.log(res);
      },
      prefill: {
        name:userdata[0].fullname,
        email: "youremail@example.com",
        contact: userdata[0].mobileno,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzpay = new Razorpay(options);
    rzpay.open();
  }, [Razorpay]);

  return (
    <div className="App">
      <button onClick={handlePayment}>Click</button>
    </div>
  );
}