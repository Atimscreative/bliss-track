import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sun1 } from "iconsax-react";
import { ArrowDownLeft, ArrowUpRight, Plus } from "lucide-react";
import { Link } from "react-router";

export default function Dashboard() {
  return (
    <>
      <header className=" py-4">
        <div className="wrapper flex justify-between">
          <div>
            <div className="inline-flex gap-3">
              <Sun1 size={24} variant="Outline" className="fill-main" />
              <p>Wed, 25 Apr 2025 </p>
            </div>
            <h1 className="font-semibold text-xl">Welcome, Oluwaseyi Bliss!</h1>
          </div>

          {/* USER PROFILE */}
          <span className="border-2 rounded-full border-main w-10 h-10 inline-flex justify-center items-center">
            BT
          </span>
        </div>
      </header>
      <section>
        <div className="wrapper grid grid-cols-2 gap-2">
          <div className="p-6 bg-gradient-to-bl from-0% relative to-100 rounded-2xl from-[#4A1716] to-[#9C302D]">
            <span className="text-bg bg-black/30 absolute top-2 right-2 w-8 h-8 rounded-full inline-flex justify-center items-center">
              <ArrowUpRight size={24} color="#fff" />
            </span>
            <span className="block text-bg">Expenses</span>
            <span className="block font-medium text-bg text-2xl my-1">
              ₦210,450
            </span>
            <span className="block text-xs text-surface">17 transaction</span>
          </div>

          <div className="p-6 bg-gradient-to-bl relative from-0% to-100 rounded-2xl from-[#1A3D10] to-[#2A8D2A]">
            <span className="text-bg bg-black/30 absolute top-2 right-2 w-8 h-8 rounded-full inline-flex justify-center items-center">
              <ArrowDownLeft size={24} color="#fff" />
            </span>
            <span className="block text-bg">Sales</span>
            <span className="block font-medium text-bg text-2xl my-1">
              ₦210,450
            </span>
            <span className="block text-xs text-surface">5 transaction</span>
          </div>

          <div className="bg-main p-6 rounded-2xl">
            <span className="block font-medium text-heading text-2xl">
              ₦210,450
            </span>
            <span className="text-sm text-body">Estimated Profit</span>
          </div>
          <div className="bg-main p-6 rounded-2xl">
            <span className="block font-medium text-heading text-2xl">05</span>
            <span className="text-sm text-body">Bedsheets left</span>
          </div>
        </div>
      </section>
      {/* QUICK ACTIONS */}
      <div className="wrapper flex justify-center gap-2 *:grow mt-5">
        <Button className="text-heading h-auto py-3 bg-transparent border shadow-none border-heading">
          <Plus size={20} className="" />
          Add Sales
        </Button>
        <Button className="text-heading h-auto py-3 bg-transparent border shadow-none border-heading">
          <Plus size={20} className="" />
          Add Expenses
        </Button>
      </div>{" "}
      {/* LATEST SALES */}
      <div className="wrapper mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-heading">Latest Sales</h2>
          <Link
            to="/sales"
            className="text-main underline underline-offset-2 uppercase"
          >
            View all
          </Link>
        </div>

        <div className="border-surface p-4 border rounded-[8px]">
          <div className="text-body text-sm">Wed, 13 Apr 2025</div>
          <span className="text-heading">ID: BT12332</span> <br />
          <span className="text-heading">
            Sizes: &nbsp;
            <Badge className="bg-surface">King+</Badge> &nbsp;
            <Badge className="bg-surface">King</Badge> &nbsp;
            <Badge className="bg-surface">Twin</Badge>
          </span>
          <br />
          <span className="text-heading">Quantity: 3</span>
          <br />
          <div className="flex justify-between items-center pt-2 border-t border-surface mt-4">
            <span className="font-medium">Total: ₦12,000</span>
            <Button
              size="sm"
              className="rounded-[4px] text-sm bg-main hover:bg-main/90"
            >
              Full Details
            </Button>
          </div>
        </div>
      </div>
      {/* LATEST EXPENSES */}
      <div className="wrapper mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-heading">
            Latest Expenses
          </h2>
          <Link
            to="/sales"
            className="text-main underline underline-offset-2 uppercase"
          >
            View all
          </Link>
        </div>

        <div className="border-surface p-4 border rounded-[8px]">
          <div className="text-body text-sm">Wed, 13 Apr 2025</div>
          <span className="text-heading">ID: BT12332</span> <br />
          <span className="text-heading">
            Expenses: &nbsp; <br />
            <Badge className="bg-surface rounded-[4px]">
              Bedsheet Materials
            </Badge>{" "}
            &nbsp;
            <Badge className="bg-surface rounded-[4px]">Nylon</Badge> &nbsp;
            <Badge className="bg-surface rounded-[4px]">Fancy bag</Badge>
            <Badge className="bg-surface rounded-[4px]">Transportation</Badge>
            <Badge className="bg-surface rounded-[4px]">Threads</Badge>
          </span>
          <br />
          <div className="flex justify-between items-center pt-2 border-t border-surface mt-4">
            <span className="font-medium">Total: ₦122,100</span>
            <Button
              size="sm"
              className="rounded-[4px] text-sm bg-main hover:bg-main/90"
            >
              Full Details
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

/* 
4½ ft → Twin

6×6 ft → King

4×6 ft → Single

6×6 ft (4P) → King+


*/
