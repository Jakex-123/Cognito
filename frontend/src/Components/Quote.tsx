const Quote = () => {
  return (
    <div className="bg-slate-200 h-screen flex justify-center flex-col items-center">
      <div className="max-w-lg text-3xl font-bold">
        "This is how you do it: you sit down at the keyboard and you put one
        word after another until its done. It's that easy, and that hard."
        <span className="block mt-4 text-xl font-semibold">Neil Gaiman</span>
        <span className="block text-gray-500 text-sm font-normal">English Writer</span>
      </div>
    </div>
  );
};

export default Quote;
