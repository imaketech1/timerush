import Timer from "../Timer"; 

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-black text-white"> {/* Set background to black and text to white */}
      <main className="flex flex-col items-center">
        <Timer />
      </main>
    </div>
  );
}
