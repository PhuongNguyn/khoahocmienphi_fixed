import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/layout/Navbar/index.module.scss";
import { FaBars, FaTimes } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import Link from "next/link";
import { AiOutlineRight } from "react-icons/ai";
import { useQuery } from "react-query";
import { getAllCategories } from "@/api/category";
import { useRouter } from "next/router";

const sidebarConfig = [
  {
    id: 1,
    name: "Khoá học mới nhất",
    slug: "khoa-hoc-moi-nhat",
  },
];

function Navbar() {
  const ref = useRef<HTMLInputElement>(null);
  const [showNavbar, setShowNavbar] = useState(true);
  const [showNavbarMobile, setShowNavbarMobile] = useState(false);
  const { data, isLoading } = useQuery("getAllCategories", () =>
    getAllCategories()
  );
  const [search, setSearch] = useState("");
  const router = useRouter();

  const onEnterSearch = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // e.preventDefault();
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      router.push({
        pathname: "/",
        query: { keyword: search },
      });
    }
  };

  const onClickSearch = (e: any) => {
    e.preventDefault();

    router.push({
      pathname: "/",
      query: { keyword: search },
    });
  };
  const handleToggleNavbar = () => {
    const positionWindow =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    window.innerWidth < 1199 && setShowNavbar(!showNavbar);

    window.innerWidth >= 1199 &&
      positionWindow > 20 &&
      setShowNavbar(!showNavbar);

    setShowNavbarMobile(true);
  };

  useEffect(() => {
    window.onscroll = () => {
      const positionWindow =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      if (positionWindow > 20) {
        if (ref.current) {
          setShowNavbar(false);
          ref.current.classList.add("navbar-scroll-down");
        }
      } else {
        if (ref.current) {
          setShowNavbar(true);
          ref.current.classList.remove("navbar-scroll-down");
        }
      }
    };

    window.onresize = () => {
      if (window.innerWidth > 1199) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
    };

    router.events.on("routeChangeComplete", () => {
      setShowNavbarMobile(false);
    });

    router.events.on("routeChangeError", () => {
      setShowNavbarMobile(false);
    });

    return () => {
      router.events.off("routeChangeComplete", () => {
        setShowNavbarMobile(false);
      });

      router.events.off("routeChangeError", () => {
        setShowNavbarMobile(false);
      });
    };
  }, []);

  const onChangeSearch = (e: any) => {
    setSearch(e.target.value);
  };
  return (
    <div ref={ref} className={styles.navbar}>
      <div className={`${styles.navbarWrapper} container`}>
        {showNavbar && (
          <div className={`${styles.navbarCategory} hide-sidebar`}>
            <ul id="category-menu">
              {(data?.data?.data || []).map((item: any) => (
                <li className="" key={item?._id}>
                  <Link href={`/${item?.path || ""}`}>
                    {item?.name}
                    {item?.child?.length > 0 && (
                      <AiOutlineRight
                        className={styles.navbarArrowRight}
                        size={10}
                      />
                    )}
                  </Link>
                  {item?.child?.length > 0 && (
                    <ul className={styles.navbarCategoryLv2}>
                      {(item?.child || []).map((e: any) => (
                        <li>
                          <Link key={e?._id} href={`/${e?.path || ""}`}>
                            {e?.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
        {showNavbarMobile && (
          <div
            className={styles.navbarCategoryBlurGlass}
            onClick={() => setShowNavbarMobile(false)}
          ></div>
        )}
        {showNavbarMobile && (
          <div className={styles.navbarCategoryMobile}>
            <div className={styles.navbarCategoryMobileHeader}>
              <FaTimes
                style={{ cursor: "pointer" }}
                onClick={() => setShowNavbarMobile(false)}
              />
              <span>Close</span>
            </div>
            <ul>
              {(data?.data?.data || []).map((item: any) => (
                <li key={item?._id}>
                  <Link href={`/${item?.path || ""}`}>{item?.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className={styles.navbarLogo}>
          <Link href={"/"}>
            <img
              style={{ width: "180px", height: "auto" }}
              src="/images/logo.png"
            />
          </Link>
        </div>
        <div className={styles.navbarIcon} onClick={handleToggleNavbar}>
          <FaBars size={16} />
          {showNavbar && (
            <div className={`${styles.navbarIconTriangle} hide-sidebar`}></div>
          )}
        </div>
        <div className={styles.navbarSearchWrapper}>
          <div className={styles.navbarSearch}>
            <input
              type={"text"}
              placeholder="Tìm kiếm"
              onChange={onChangeSearch}
              onKeyUp={onEnterSearch}
            />
            <div
              className={styles.navbarSearchButton}
              onClick={onClickSearch}
              style={{ cursor: "pointer" }}
            >
              <BiSearch size={20} />
            </div>
          </div>
          <p className={styles.navbarSearchNote}>
            Học hành là một quá trình không ngừng, chúng ta phải học mãi mãi để
            tiếp tục phát triển và giữ mình trong bước với thời gian.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
