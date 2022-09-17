const Header = () => {
  return (
    <div className="w-full h-12 text-white bg-slate-700 flex justify-between">
      <div>Gaming</div>
      <div className="flex">
        <button className="bg-slate-600 text-white p-2 rounded-md">
          Login
        </button>
        <button>Register</button>
      </div>
    </div>
  );
};

export default Header;
