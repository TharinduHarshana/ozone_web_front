import ShoppingHeader from "@/components/shopping-view/header";


function UnauthPage() {
  return (
    <div>
      <ShoppingHeader />
      <main className="pt-16">
        <h1 className="text-center text-3xl font-bold mt-10">Welcome to Ozone Computers</h1>
        <p className="text-center text-lg mt-4">Discover the best products for your needs.</p>
      </main>
    </div>
  );
}

export default UnauthPage;
