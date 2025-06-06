--
-- PostgreSQL database dump
--

-- Dumped from database version 16.8
-- Dumped by pg_dump version 16.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: default
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO "default";

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: default
--

COMMENT ON SCHEMA public IS '';


--
-- Name: OrderStatus; Type: TYPE; Schema: public; Owner: default
--

CREATE TYPE public."OrderStatus" AS ENUM (
    'PENDING',
    'SUCCEEDED',
    'CANCELLED'
);


ALTER TYPE public."OrderStatus" OWNER TO "default";

--
-- Name: UserRole; Type: TYPE; Schema: public; Owner: default
--

CREATE TYPE public."UserRole" AS ENUM (
    'USER',
    'ADMIN'
);


ALTER TYPE public."UserRole" OWNER TO "default";

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Cart; Type: TABLE; Schema: public; Owner: default
--

CREATE TABLE public."Cart" (
    id integer NOT NULL,
    "userId" integer,
    "totalAmount" integer DEFAULT 0 NOT NULL,
    token text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Cart" OWNER TO "default";

--
-- Name: CartItem; Type: TABLE; Schema: public; Owner: default
--

CREATE TABLE public."CartItem" (
    id integer NOT NULL,
    "productItemId" integer NOT NULL,
    "cartId" integer NOT NULL,
    quantity integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."CartItem" OWNER TO "default";

--
-- Name: CartItem_id_seq; Type: SEQUENCE; Schema: public; Owner: default
--

CREATE SEQUENCE public."CartItem_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."CartItem_id_seq" OWNER TO "default";

--
-- Name: CartItem_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: default
--

ALTER SEQUENCE public."CartItem_id_seq" OWNED BY public."CartItem".id;


--
-- Name: Cart_id_seq; Type: SEQUENCE; Schema: public; Owner: default
--

CREATE SEQUENCE public."Cart_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Cart_id_seq" OWNER TO "default";

--
-- Name: Cart_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: default
--

ALTER SEQUENCE public."Cart_id_seq" OWNED BY public."Cart".id;


--
-- Name: Category; Type: TABLE; Schema: public; Owner: default
--

CREATE TABLE public."Category" (
    id integer NOT NULL,
    name text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Category" OWNER TO "default";

--
-- Name: Category_id_seq; Type: SEQUENCE; Schema: public; Owner: default
--

CREATE SEQUENCE public."Category_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Category_id_seq" OWNER TO "default";

--
-- Name: Category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: default
--

ALTER SEQUENCE public."Category_id_seq" OWNED BY public."Category".id;


--
-- Name: Ingridient; Type: TABLE; Schema: public; Owner: default
--

CREATE TABLE public."Ingridient" (
    id integer NOT NULL,
    name text NOT NULL,
    "imageUrl" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "cartItemId" integer,
    price integer NOT NULL
);


ALTER TABLE public."Ingridient" OWNER TO "default";

--
-- Name: Ingridient_id_seq; Type: SEQUENCE; Schema: public; Owner: default
--

CREATE SEQUENCE public."Ingridient_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Ingridient_id_seq" OWNER TO "default";

--
-- Name: Ingridient_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: default
--

ALTER SEQUENCE public."Ingridient_id_seq" OWNED BY public."Ingridient".id;


--
-- Name: Order; Type: TABLE; Schema: public; Owner: default
--

CREATE TABLE public."Order" (
    id integer NOT NULL,
    "userId" integer,
    token text NOT NULL,
    "totalAomunt" integer NOT NULL,
    status public."OrderStatus" NOT NULL,
    "paymentId" text NOT NULL,
    items jsonb NOT NULL,
    "fullName" text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    adderss text NOT NULL,
    comment text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Order" OWNER TO "default";

--
-- Name: Order_id_seq; Type: SEQUENCE; Schema: public; Owner: default
--

CREATE SEQUENCE public."Order_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Order_id_seq" OWNER TO "default";

--
-- Name: Order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: default
--

ALTER SEQUENCE public."Order_id_seq" OWNED BY public."Order".id;


--
-- Name: Product; Type: TABLE; Schema: public; Owner: default
--

CREATE TABLE public."Product" (
    id integer NOT NULL,
    name text NOT NULL,
    "categoryId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "imageUrl" text NOT NULL
);


ALTER TABLE public."Product" OWNER TO "default";

--
-- Name: Product_id_seq; Type: SEQUENCE; Schema: public; Owner: default
--

CREATE SEQUENCE public."Product_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Product_id_seq" OWNER TO "default";

--
-- Name: Product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: default
--

ALTER SEQUENCE public."Product_id_seq" OWNED BY public."Product".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: default
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    "fullName" text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    role public."UserRole" DEFAULT 'USER'::public."UserRole" NOT NULL,
    verified timestamp(3) without time zone NOT NULL,
    provider text,
    "providerId" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."User" OWNER TO "default";

--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: default
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."User_id_seq" OWNER TO "default";

--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: default
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- Name: Variation; Type: TABLE; Schema: public; Owner: default
--

CREATE TABLE public."Variation" (
    id integer NOT NULL,
    price integer NOT NULL,
    size integer,
    "productId" integer NOT NULL,
    "pizzaType" integer
);


ALTER TABLE public."Variation" OWNER TO "default";

--
-- Name: Variation_id_seq; Type: SEQUENCE; Schema: public; Owner: default
--

CREATE SEQUENCE public."Variation_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Variation_id_seq" OWNER TO "default";

--
-- Name: Variation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: default
--

ALTER SEQUENCE public."Variation_id_seq" OWNED BY public."Variation".id;


--
-- Name: VarificationCode; Type: TABLE; Schema: public; Owner: default
--

CREATE TABLE public."VarificationCode" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    code text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."VarificationCode" OWNER TO "default";

--
-- Name: VarificationCode_id_seq; Type: SEQUENCE; Schema: public; Owner: default
--

CREATE SEQUENCE public."VarificationCode_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."VarificationCode_id_seq" OWNER TO "default";

--
-- Name: VarificationCode_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: default
--

ALTER SEQUENCE public."VarificationCode_id_seq" OWNED BY public."VarificationCode".id;


--
-- Name: _CartItemToIngridient; Type: TABLE; Schema: public; Owner: default
--

CREATE TABLE public."_CartItemToIngridient" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);


ALTER TABLE public."_CartItemToIngridient" OWNER TO "default";

--
-- Name: _IngridientToProduct; Type: TABLE; Schema: public; Owner: default
--

CREATE TABLE public."_IngridientToProduct" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);


ALTER TABLE public."_IngridientToProduct" OWNER TO "default";

--
-- Name: Cart id; Type: DEFAULT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."Cart" ALTER COLUMN id SET DEFAULT nextval('public."Cart_id_seq"'::regclass);


--
-- Name: CartItem id; Type: DEFAULT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."CartItem" ALTER COLUMN id SET DEFAULT nextval('public."CartItem_id_seq"'::regclass);


--
-- Name: Category id; Type: DEFAULT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."Category" ALTER COLUMN id SET DEFAULT nextval('public."Category_id_seq"'::regclass);


--
-- Name: Ingridient id; Type: DEFAULT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."Ingridient" ALTER COLUMN id SET DEFAULT nextval('public."Ingridient_id_seq"'::regclass);


--
-- Name: Order id; Type: DEFAULT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."Order" ALTER COLUMN id SET DEFAULT nextval('public."Order_id_seq"'::regclass);


--
-- Name: Product id; Type: DEFAULT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."Product" ALTER COLUMN id SET DEFAULT nextval('public."Product_id_seq"'::regclass);


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Name: Variation id; Type: DEFAULT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."Variation" ALTER COLUMN id SET DEFAULT nextval('public."Variation_id_seq"'::regclass);


--
-- Name: VarificationCode id; Type: DEFAULT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."VarificationCode" ALTER COLUMN id SET DEFAULT nextval('public."VarificationCode_id_seq"'::regclass);


--
-- Name: CartItem CartItem_pkey; Type: CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."CartItem"
    ADD CONSTRAINT "CartItem_pkey" PRIMARY KEY (id);


--
-- Name: Cart Cart_pkey; Type: CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."Cart"
    ADD CONSTRAINT "Cart_pkey" PRIMARY KEY (id);


--
-- Name: Category Category_pkey; Type: CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_pkey" PRIMARY KEY (id);


--
-- Name: Ingridient Ingridient_pkey; Type: CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."Ingridient"
    ADD CONSTRAINT "Ingridient_pkey" PRIMARY KEY (id);


--
-- Name: Order Order_pkey; Type: CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_pkey" PRIMARY KEY (id);


--
-- Name: Product Product_pkey; Type: CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: Variation Variation_pkey; Type: CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."Variation"
    ADD CONSTRAINT "Variation_pkey" PRIMARY KEY (id);


--
-- Name: VarificationCode VarificationCode_pkey; Type: CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."VarificationCode"
    ADD CONSTRAINT "VarificationCode_pkey" PRIMARY KEY (id);


--
-- Name: _CartItemToIngridient _CartItemToIngridient_AB_pkey; Type: CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."_CartItemToIngridient"
    ADD CONSTRAINT "_CartItemToIngridient_AB_pkey" PRIMARY KEY ("A", "B");


--
-- Name: _IngridientToProduct _IngridientToProduct_AB_pkey; Type: CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."_IngridientToProduct"
    ADD CONSTRAINT "_IngridientToProduct_AB_pkey" PRIMARY KEY ("A", "B");


--
-- Name: Cart_userId_key; Type: INDEX; Schema: public; Owner: default
--

CREATE UNIQUE INDEX "Cart_userId_key" ON public."Cart" USING btree ("userId");


--
-- Name: Category_name_key; Type: INDEX; Schema: public; Owner: default
--

CREATE UNIQUE INDEX "Category_name_key" ON public."Category" USING btree (name);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: default
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: VarificationCode_code_key; Type: INDEX; Schema: public; Owner: default
--

CREATE UNIQUE INDEX "VarificationCode_code_key" ON public."VarificationCode" USING btree (code);


--
-- Name: VarificationCode_userId_code_key; Type: INDEX; Schema: public; Owner: default
--

CREATE UNIQUE INDEX "VarificationCode_userId_code_key" ON public."VarificationCode" USING btree ("userId", code);


--
-- Name: VarificationCode_userId_key; Type: INDEX; Schema: public; Owner: default
--

CREATE UNIQUE INDEX "VarificationCode_userId_key" ON public."VarificationCode" USING btree ("userId");


--
-- Name: _CartItemToIngridient_B_index; Type: INDEX; Schema: public; Owner: default
--

CREATE INDEX "_CartItemToIngridient_B_index" ON public."_CartItemToIngridient" USING btree ("B");


--
-- Name: _IngridientToProduct_B_index; Type: INDEX; Schema: public; Owner: default
--

CREATE INDEX "_IngridientToProduct_B_index" ON public."_IngridientToProduct" USING btree ("B");


--
-- Name: CartItem CartItem_cartId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."CartItem"
    ADD CONSTRAINT "CartItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES public."Cart"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: CartItem CartItem_productItemId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."CartItem"
    ADD CONSTRAINT "CartItem_productItemId_fkey" FOREIGN KEY ("productItemId") REFERENCES public."Variation"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Cart Cart_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."Cart"
    ADD CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Order Order_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Product Product_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."Category"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Variation Variation_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."Variation"
    ADD CONSTRAINT "Variation_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: VarificationCode VarificationCode_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."VarificationCode"
    ADD CONSTRAINT "VarificationCode_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: _CartItemToIngridient _CartItemToIngridient_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."_CartItemToIngridient"
    ADD CONSTRAINT "_CartItemToIngridient_A_fkey" FOREIGN KEY ("A") REFERENCES public."CartItem"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _CartItemToIngridient _CartItemToIngridient_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."_CartItemToIngridient"
    ADD CONSTRAINT "_CartItemToIngridient_B_fkey" FOREIGN KEY ("B") REFERENCES public."Ingridient"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _IngridientToProduct _IngridientToProduct_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."_IngridientToProduct"
    ADD CONSTRAINT "_IngridientToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES public."Ingridient"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _IngridientToProduct _IngridientToProduct_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."_IngridientToProduct"
    ADD CONSTRAINT "_IngridientToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: default
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;


--
-- PostgreSQL database dump complete
--

