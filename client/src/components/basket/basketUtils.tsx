import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { IBasketItem, addToBasket } from "../../store/userSlice";
import { useAddToBasketMutation } from "../../store/api/userApi";
import { useCallback } from "react";
import { ISetItem } from "../creator/Creator";
export interface ISet {
  _id: string;
  name: string;
  price: number;
  count: number;
  composition: ISetItem[];
}
interface BasketUtilsProps {
  id?: string;
  set?: ISet;
  children: (handleAddToBasket: any) => React.ReactNode;
}

const BasketUtils: React.FC<BasketUtilsProps> = ({ id, set, children }) => {
  const user = useAppSelector((state) => state.user.user);
  const products = useAppSelector((state) => state.products.products);
  const userDispatch = useAppDispatch();
  const [addTobasketApi] = useAddToBasketMutation();

  const selectedProduct = products.find((item) => item._id === id);

  const handleAddToBasket = useCallback(async () => {
    if (selectedProduct) {
      const newBasketItem: IBasketItem = {
        ...selectedProduct,
        count: 1,
      };

      userDispatch(addToBasket(newBasketItem));

      try {
        await addTobasketApi({
          userId: user._id,
          newBasketItem,
        }).unwrap();
      } catch (error) {
        console.log(error);
      }
    } else if (set) {
      userDispatch(addToBasket(set));

      try {
        await addTobasketApi({
          userId: user._id,
          newBasketItem: set,
        }).unwrap();
      } catch (error) {
        console.log(error);
      }
    } else {
      const selectedSet = user.basket.find((item) => item._id === id);

      if (selectedSet) {
        userDispatch(addToBasket(selectedSet));

        try {
          await addTobasketApi({
            userId: user._id,
            newBasketItem: selectedSet,
          }).unwrap();
        } catch (error) {
          console.log(error);
        }
      }
    }
  }, [selectedProduct, id, userDispatch, addTobasketApi]);

  return <>{children(handleAddToBasket)}</>;
};

export default BasketUtils;

export const handleAmountBasket = (basket: (IBasketItem | ISet)[]) => {
  return basket.reduce((acc, curr) => acc + curr.price * curr.count, 0);
};
