import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
    return (
        <div>
            <Navbar />
            <main>
                <h1>Welcome to Sportify</h1>
                <p>Manage your sports teams, players, and matches seamlessly!</p>
            </main>
            <Footer />
        </div>
    );
};

export default Home;