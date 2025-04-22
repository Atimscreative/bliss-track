import { Link } from "react-router";

export default function Header() {
  return (
    <>
      <header className="bg-white  border-b py-3 border-neutral-200 sticky top-0 z-10 dark:bg-neutral-900 dark:border-neutral-800">
        <div className="wrapper mx-auto px-4">
          <div className="flex justify-between">
            <span className="font-bold text-xl text-bliss-500">BlissTrack</span>

            <div className="space-x-4">
              <Link to="/shop">Shop</Link>
              <Link to="/cart">Cart</Link>
              <Link to="/orders">Orders</Link>
              <Link to="/my-profile">My Profile</Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
