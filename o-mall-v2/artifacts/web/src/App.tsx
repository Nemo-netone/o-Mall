import { Switch, Route, Link } from "wouter";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { ProductList } from "./pages/ProductList";
import { ProductDetail } from "./pages/ProductDetail";
import { Category } from "./pages/Category";
import { Profile } from "./pages/Profile";
import { Functions } from "./pages/Functions";
import { Company } from "./pages/Company";
import { Tech } from "./pages/Tech";
import { Charity } from "./pages/Charity";
import { Knowledge } from "./pages/Knowledge";
import { HealthAssessment } from "./pages/HealthAssessment";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";

function NotFound() {
  return (
    <div className="page empty-state">
      <h2>页面不存在</h2>
      <Link href="/" className="btn btn-primary">
        回首页
      </Link>
    </div>
  );
}

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/products" component={ProductList} />
        <Route path="/product/:id" component={ProductDetail} />
        <Route path="/category" component={Category} />
        <Route path="/profile" component={Profile} />
        <Route path="/functions" component={Functions} />
        <Route path="/company" component={Company} />
        <Route path="/tech" component={Tech} />
        <Route path="/charity" component={Charity} />
        <Route path="/knowledge" component={Knowledge} />
        <Route path="/health-assessment" component={HealthAssessment} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

export default App;
