import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { IProduct } from "../../store/productSlice";
import { IBasketItem, addToBasket } from "../../store/userSlice";
import { useAddToBasketMutation } from "../../store/api/userApi";

interface BasketUtilsProps {
  id: string;
  children: (handleAddToBasket: () => void) => React.ReactNode;
}

const BasketUtils: React.FC<BasketUtilsProps> = ({ id, children }) => {
  const user = useAppSelector((state) => state.user.user);
  const products = useAppSelector((state) => state.products.products);
  const userDispatch = useAppDispatch();
  const [addTobasketApi] = useAddToBasketMutation();

  const selectedProduct = products.find((item) => item._id === id);

  const handleAddToBasket = async () => {
    if (selectedProduct) {
      const newBasketItem: IBasketItem = {
        ...selectedProduct,
        count: 1,
      };

      userDispatch(addToBasket(newBasketItem));

      try {
        const payload = await addTobasketApi({
          userId: user._id,
          newBasketItem,
        }).unwrap();
        console.log(payload);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return <>{children(handleAddToBasket)}</>;
};

export default BasketUtils;

// import { IProduct } from "../../store/productSlice";
// import { IBasketItem } from "../../store/userSlice";

// function basketUtils() {
//   const handleAddToBasket = async (
//     id: string,
//     user: any,
//     products: any,
//     userDispatch: any,
//     addToBasket: any,
//     addTobasketApi: any
//   ) => {
//     const selectedProduct: IProduct | undefined = products.find(
//       (item: any) => item._id === id
//     );

//     if (selectedProduct) {
//       const newBasketItem: IBasketItem = {
//         ...selectedProduct,
//         count: 1,
//       };

//       userDispatch(addToBasket(newBasketItem));

//       try {
//         const payload = await addTobasketApi({
//           userId: user._id,
//           newBasketItem,
//         }).unwrap();
//         console.log(payload);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   };
//   return handleAddToBasket;
// }

// export default basketUtils;
