import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { useIsAdmin } from "@/hooks/use-is-admin";
import { Menu, Search, Heart, ShoppingBag, ChevronDown, Trash2, ExternalLink, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { publishedBooksQuery } from "@/lib/books";
import { useCartWishlist } from "@/hooks/use-cart-wishlist";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { NotesalgiaWordmark } from "@/components/notesalgia-wordmark";

export function SiteNav() {
  const { isAdmin, user } = useIsAdmin();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  
  const { data: books = [] } = useQuery(publishedBooksQuery);
  const { cart, wishlist, removeFromCart, toggleWishlist, isInCart, addToCart } = useCartWishlist();

  const [searchVal, setSearchVal] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    "Business",
    "Education",
    "Self Help",
    "Design",
    "Technology",
    "Health & Fitness"
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({
      to: "/collection",
      search: {
        search: searchVal.trim() || undefined,
        category: selectedCategory === "all" ? undefined : selectedCategory,
      },
    });
  };

  // Resolve books in cart & wishlist
  const cartBooks = books.filter((b) => cart.includes(b.id));
  const wishlistBooks = books.filter((b) => wishlist.includes(b.id));
  
  const cartTotal = cartBooks.reduce((sum, b) => sum + Number(b.current_price), 0);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-background border-b border-border text-left">
      {/* MAIN HEADER ROW */}
      <div className="bg-background py-4">
        <div className="mx-auto max-w-7xl px-6 md:px-10 flex items-center justify-between gap-4">
          
          {/* Logo & Sub-tagline */}
          <Link to="/" className="flex flex-col select-none group">
            <NotesalgiaWordmark
              notesColor="var(--foreground)"
              algiaColor="#19C7D9"
              className="text-2xl md:text-3xl tracking-tight transition-transform duration-200 group-hover:scale-[1.02]"
            />
            <span className="hidden md:inline text-[9px] tracking-wider text-muted-foreground mt-1">
              Where every page keeps a memory
            </span>
          </Link>

          {/* Search bar (Hidden on mobile) */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-xl border border-border rounded-full bg-muted/30 focus-within:border-primary/50 transition-all shadow-sm">
            
            {/* Category Dropdown inside Search Bar */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center px-4 py-2 text-muted-foreground border-r border-border/85 bg-muted/10 shrink-0 select-none text-[11px] gap-1.5 cursor-pointer hover:bg-muted/35 rounded-l-full uppercase tracking-wider font-semibold">
                  <span>{selectedCategory === "all" ? "All Categories" : selectedCategory}</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="bg-background border border-border p-1 rounded-2xl min-w-[140px] shadow-soft">
                <DropdownMenuItem 
                  onClick={() => setSelectedCategory("all")}
                  className="text-xs uppercase py-1.5 px-3 rounded-full hover:bg-muted font-semibold cursor-pointer"
                >
                  All Categories
                </DropdownMenuItem>
                {categories.map((c) => (
                  <DropdownMenuItem
                    key={c}
                    onClick={() => setSelectedCategory(c)}
                    className="text-xs py-1.5 px-3 rounded-full hover:bg-muted cursor-pointer"
                  >
                    {c}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Input field */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search for PDFs, EBooks, Notes..."
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="w-full pl-4.5 pr-10 py-2 bg-transparent text-xs text-foreground focus:outline-none placeholder:text-muted-foreground/60 font-sans"
              />
            </div>
            <button type="submit" className="bg-foreground text-background px-5 py-2 hover:bg-foreground/90 transition-colors shrink-0 flex items-center justify-center cursor-pointer rounded-r-full">
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Right side controls */}
          <div className="flex items-center gap-6">
            
            {/* Wishlist Drawer Sheet */}
            <Sheet>
              <SheetTrigger asChild>
                <button className="flex items-center gap-1.5 text-xs text-foreground hover:opacity-85 transition-opacity cursor-pointer">
                  <Heart className="w-4 h-4" />
                  <span className="hidden lg:inline">Wishlist</span>
                  {wishlist.length > 0 && (
                    <span className="flex items-center justify-center bg-foreground text-background w-4 h-4 rounded-full text-[9px] font-bold">
                      {wishlist.length}
                    </span>
                  )}
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background flex flex-col h-full border-l border-border w-[380px] sm:w-[440px] p-6 text-left">
                <SheetTitle className="font-serif text-2xl font-bold border-b border-border pb-4">My Wishlist</SheetTitle>
                <SheetDescription className="sr-only">
                  View and manage your saved books in Notestalgia Wishlist.
                </SheetDescription>

                {wishlistBooks.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center text-muted-foreground p-8">
                    <Heart className="w-10 h-10 stroke-[1.5px] mb-3 text-muted-foreground/45" />
                    <p className="text-sm font-serif italic">Your wishlist is empty.</p>
                    <p className="text-xs mt-1">Tap the heart icon on any volume to save it.</p>
                  </div>
                ) : (
                  <div className="flex-1 overflow-y-auto py-4 space-y-4">
                    {wishlistBooks.map((book) => (
                      <div key={book.id} className="flex gap-3 pb-4 border-b border-border/40 last:border-b-0 items-center justify-between">
                        <div className="flex gap-3 items-center min-w-0">
                          <div className="w-12 h-16 rounded overflow-hidden bg-muted shrink-0 border border-border/30">
                            <img src={book.cover_image || ""} alt={book.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="min-w-0 text-left">
                            <Link 
                              to="/book/$slug" 
                              params={{ slug: book.slug }}
                              className="font-serif text-sm font-bold text-foreground hover:underline line-clamp-1"
                            >
                              <SheetClose>{book.title}</SheetClose>
                            </Link>
                            <p className="text-[10px] text-muted-foreground">by {book.author || "Notestalgia"}</p>
                            <p className="text-xs font-bold mt-1 text-foreground">₹{Number(book.current_price).toFixed(0)}</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <button
                            onClick={() => toggleWishlist(book.id)}
                            className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
                            aria-label="Delete from wishlist"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </SheetContent>
            </Sheet>

            {/* Cart Drawer Sheet */}
            <Sheet>
              <SheetTrigger asChild>
                <button className="flex items-center gap-1.5 text-xs text-foreground hover:opacity-85 transition-opacity cursor-pointer">
                  <ShoppingBag className="w-4 h-4" />
                  <span className="hidden lg:inline">Cart</span>
                  <span className="flex items-center justify-center bg-foreground text-background w-4 h-4 rounded-full text-[9px] font-bold">
                    {cart.length}
                  </span>
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background flex flex-col h-full border-l border-border w-[380px] sm:w-[440px] p-6 text-left">
                <SheetTitle className="font-serif text-2xl font-bold border-b border-border pb-4">Shopping Cart</SheetTitle>
                <SheetDescription className="sr-only">
                  Manage items in your shopping cart and proceed to checkout.
                </SheetDescription>

                {cartBooks.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center text-muted-foreground p-8">
                    <ShoppingBag className="w-10 h-10 stroke-[1.5px] mb-3 text-muted-foreground/45" />
                    <p className="text-sm font-serif italic">Your cart is currently empty.</p>
                    <p className="text-xs mt-1">Browse the bookstore collection to add volumes.</p>
                  </div>
                ) : (
                  <>
                    <div className="flex-1 overflow-y-auto py-4 space-y-4">
                      {cartBooks.map((book) => (
                        <div key={book.id} className="flex gap-3 pb-4 border-b border-border/40 last:border-b-0 items-center justify-between">
                          <div className="flex gap-3 items-center min-w-0">
                            <div className="w-12 h-16 rounded overflow-hidden bg-muted shrink-0 border border-border/30">
                              <img src={book.cover_image || ""} alt={book.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="min-w-0 text-left">
                              <Link 
                                to="/book/$slug" 
                                params={{ slug: book.slug }}
                                className="font-serif text-sm font-bold text-foreground hover:underline line-clamp-1"
                              >
                                <SheetClose>{book.title}</SheetClose>
                              </Link>
                              <p className="text-[10px] text-muted-foreground">by {book.author || "Notestalgia"}</p>
                              <p className="text-xs font-bold mt-1 text-foreground">₹{Number(book.current_price).toFixed(0)}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-1.5">
                            <a
                              href={book.superprofile_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded hover:bg-muted text-foreground flex items-center gap-1 text-[10px] font-semibold border border-border/60"
                            >
                              <span>Buy</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                            <button
                              onClick={() => removeFromCart(book.id)}
                              className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Cart Footer */}
                    <div className="pt-4 border-t border-border mt-auto space-y-4">
                      <div className="flex items-center justify-between font-sans text-sm">
                        <span className="text-muted-foreground">Total:</span>
                        <span className="font-bold text-lg text-foreground">₹{cartTotal.toFixed(0)}</span>
                      </div>
                      
                      <div className="space-y-2">
                        {cartBooks.length > 0 && (
                          <a
                            href={cartBooks[0].superprofile_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary w-full text-center text-xs py-3 flex items-center justify-center gap-2 cursor-pointer font-bold"
                          >
                            <span>Checkout Item(s)</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        <p className="text-[10px] text-muted-foreground text-center">
                          Checkouts are securely routed to our Superprofile payment pages.
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </SheetContent>
            </Sheet>

            {/* Auth Actions / Profile */}
            <div className="hidden sm:flex items-center gap-2">
              {user ? (
                <>
                  {isAdmin && (
                    <Link to="/admin" className="text-xs text-foreground/80 hover:text-foreground font-semibold px-2 py-1">
                      Admin
                    </Link>
                  )}
                  {user && (
                    <Link to="/library" className="text-xs text-foreground/80 hover:text-foreground font-semibold px-2 py-1">
                      Library
                    </Link>
                  )}
                  <button
                    onClick={() => supabase.auth.signOut()}
                    className="btn-ghost text-xs cursor-pointer py-1.5 px-3.5"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/auth"
                    className="btn-ghost text-xs py-1.5 px-3.5"
                    search={{ redirect: pathname }}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/auth"
                    className="btn-primary text-xs py-1.5 px-3.5"
                    search={{ redirect: pathname }}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile hamburger menu */}
            <Sheet>
              <SheetTrigger asChild>
                <button
                  aria-label="Toggle menu"
                  className="grid h-8 w-8 place-items-center rounded-md border border-border bg-muted/40 md:hidden cursor-pointer hover:bg-muted/60 transition-colors"
                >
                  <Menu className="h-4 w-4" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-background flex flex-col justify-between h-full border-l border-border w-72 p-6 text-left"
              >
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Access site navigation links and account settings.
                </SheetDescription>

                <div className="flex flex-col gap-6 mt-4">
                  <div className="flex items-center justify-between pb-4 border-b border-border">
                    <Link to="/" className="flex flex-col select-none">
                      <span className="font-serif text-2xl font-bold tracking-tight text-foreground">
                        Notestalgia
                      </span>
                    </Link>
                  </div>

                  <nav className="flex flex-col gap-4 mt-2">
                    <SheetClose asChild>
                      <Link to="/" className="text-sm font-medium text-foreground/80 hover:text-foreground">
                        Home
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link to="/collection" className="text-sm font-medium text-foreground/80 hover:text-foreground">
                        Collection
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link to="/about" className="text-sm font-medium text-foreground/80 hover:text-foreground">
                        About
                      </Link>
                    </SheetClose>
                    {user && (
                      <SheetClose asChild>
                        <Link to="/library" className="text-sm font-medium text-foreground/80 hover:text-foreground">
                          My Library
                        </Link>
                      </SheetClose>
                    )}
                    {isAdmin && (
                      <SheetClose asChild>
                        <Link to="/admin" className="text-sm font-medium text-foreground/80 hover:text-foreground">
                          Admin Panel
                        </Link>
                      </SheetClose>
                    )}
                  </nav>
                </div>

                <div className="pt-6 border-t border-border mt-auto">
                  {user ? (
                    <button
                      onClick={() => supabase.auth.signOut()}
                      className="btn-ink w-full text-center text-xs py-2.5 cursor-pointer"
                    >
                      Sign Out
                    </button>
                  ) : (
                    <SheetClose asChild>
                      <Link
                        to="/auth"
                        className="btn-ink w-full text-center text-xs py-2.5"
                        search={{ redirect: pathname }}
                      >
                        Sign In
                      </Link>
                    </SheetClose>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* CATEGORIES SUB-NAV ROW (Desktop Only) */}
      <div className="hidden md:block border-t border-border bg-background py-2">
        <div className="mx-auto max-w-7xl px-6 md:px-10 flex items-center gap-8 text-xs font-medium">
          
          {/* Categories Trigger Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer py-1 text-foreground/80 hover:text-foreground select-none">
                <Menu className="w-3.5 h-3.5" />
                <span className="font-semibold uppercase tracking-wider">Categories</span>
                <ChevronDown className="w-3 h-3 text-muted-foreground" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="bg-background border border-border p-1 rounded-2xl min-w-[180px] shadow-soft">
              {categories.map((c) => (
                <DropdownMenuItem
                  key={c}
                  onClick={() => navigate({ to: "/collection", search: { category: c } })}
                  className="text-xs py-2 px-3 rounded-full hover:bg-muted cursor-pointer font-medium"
                >
                  {c}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="h-4 w-px bg-border/80" />

          {/* Sub-nav Links */}
          <nav className="flex items-center gap-8">
            <Link 
              to="/" 
              className={`pb-0.5 border-b transition-all ${
                pathname === "/" ? "text-foreground font-semibold border-foreground" : "text-muted-foreground hover:text-foreground border-transparent"
              }`}
            >
              Home
            </Link>
            <Link 
              to="/collection" 
              className={`pb-0.5 border-b transition-all ${
                pathname === "/collection" ? "text-foreground font-semibold border-foreground" : "text-muted-foreground hover:text-foreground border-transparent"
              }`}
            >
              New Arrivals
            </Link>
            <Link 
              to="/collection" 
              className="text-muted-foreground hover:text-foreground transition-colors pb-0.5"
            >
              Best Sellers
            </Link>
            <Link 
              to="/collection" 
              search={{ category: "Bundles" }}
              className="text-muted-foreground hover:text-foreground transition-colors pb-0.5"
            >
              Bundles
            </Link>
            <Link 
              to="/collection" 
              search={{ category: "Free Resources" }}
              className="text-muted-foreground hover:text-foreground transition-colors pb-0.5"
            >
              Free Resources
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
