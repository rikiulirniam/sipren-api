--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

-- Started on 2025-06-23 20:58:03

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 886 (class 1247 OID 18004)
-- Name: enum_day; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_day AS ENUM (
    'senin',
    'selasa',
    'rabu',
    'kamis',
    'jumat',
    'sabtu'
);


ALTER TYPE public.enum_day OWNER TO postgres;

--
-- Tables used by the scheduling API
--

CREATE TABLE public.ruang (
    id_ruang integer NOT NULL,
    nama_ruang character varying(255) NOT NULL
);


ALTER TABLE public.ruang OWNER TO postgres;


CREATE SEQUENCE public.ruang_id_ruang_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ruang_id_ruang_seq OWNER TO postgres;


ALTER SEQUENCE public.ruang_id_ruang_seq OWNED BY public.ruang.id_ruang;


CREATE TABLE public.jadwal (
    id_jadwal integer NOT NULL,
    id_kelas integer NOT NULL,
    hari public.enum_day NOT NULL,
    jadwal_mulai time without time zone NOT NULL,
    jadwal_selesai time without time zone NOT NULL,
    id_mapel integer NOT NULL,
    id_ruang integer NOT NULL,
    id_user integer NOT NULL,
    pecahan_absen character varying(10) NOT NULL
);


ALTER TABLE public.jadwal OWNER TO postgres;


CREATE SEQUENCE public.jadwal_id_jadwal_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.jadwal_id_jadwal_seq OWNER TO postgres;


ALTER SEQUENCE public.jadwal_id_jadwal_seq OWNED BY public.jadwal.id_jadwal;


ALTER TABLE ONLY public.ruang ALTER COLUMN id_ruang SET DEFAULT nextval('public.ruang_id_ruang_seq'::regclass);
ALTER TABLE ONLY public.jadwal ALTER COLUMN id_jadwal SET DEFAULT nextval('public.jadwal_id_jadwal_seq'::regclass);


ALTER TABLE ONLY public.ruang
    ADD CONSTRAINT ruang_pkey PRIMARY KEY (id_ruang);


ALTER TABLE ONLY public.jadwal
    ADD CONSTRAINT jadwal_pkey PRIMARY KEY (id_jadwal);

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 222 (class 1259 OID 17906)
-- Name: det_presensi; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.det_presensi (
    id_det integer NOT NULL,
    id_presensi integer NOT NULL,
    id_siswa integer NOT NULL,
    keterangan character varying(10) NOT NULL,
    present_at timestamp without time zone,
    deskripsi_keterangan character varying(255)
);


ALTER TABLE public.det_presensi OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 17905)
-- Name: det_presensi_id_det_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.det_presensi_id_det_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.det_presensi_id_det_seq OWNER TO postgres;

--
-- TOC entry 4891 (class 0 OID 0)
-- Dependencies: 221
-- Name: det_presensi_id_det_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.det_presensi_id_det_seq OWNED BY public.det_presensi.id_det;


--
-- TOC entry 224 (class 1259 OID 17913)
-- Name: jurusan; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.jurusan (
    id_jurusan integer NOT NULL,
    nama_jurusan character varying(255) NOT NULL,
    akronim character varying(10) NOT NULL
);


ALTER TABLE public.jurusan OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 17912)
-- Name: jurusan_id_jurusan_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.jurusan_id_jurusan_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.jurusan_id_jurusan_seq OWNER TO postgres;

--
-- TOC entry 4892 (class 0 OID 0)
-- Dependencies: 223
-- Name: jurusan_id_jurusan_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.jurusan_id_jurusan_seq OWNED BY public.jurusan.id_jurusan;


--
-- TOC entry 225 (class 1259 OID 17920)
-- Name: kelas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.kelas (
    id_jurusan integer NOT NULL,
    tingkat character varying(10) NOT NULL,
    no_kelas integer NOT NULL,
    id_kelas integer NOT NULL
);


ALTER TABLE public.kelas OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 18017)
-- Name: kelas_id_kelas_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.kelas_id_kelas_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.kelas_id_kelas_seq OWNER TO postgres;

--
-- TOC entry 4893 (class 0 OID 0)
-- Dependencies: 232
-- Name: kelas_id_kelas_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.kelas_id_kelas_seq OWNED BY public.kelas.id_kelas;


--
-- TOC entry 227 (class 1259 OID 17927)
-- Name: mapel; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mapel (
    id_mapel integer NOT NULL,
    nama_mapel character varying(255) NOT NULL,
    produktif smallint DEFAULT 0 NOT NULL
);


ALTER TABLE public.mapel OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 17926)
-- Name: mapel_id_mapel_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.mapel_id_mapel_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.mapel_id_mapel_seq OWNER TO postgres;

--
-- TOC entry 4894 (class 0 OID 0)
-- Dependencies: 226
-- Name: mapel_id_mapel_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.mapel_id_mapel_seq OWNED BY public.mapel.id_mapel;


--
-- TOC entry 229 (class 1259 OID 17935)
-- Name: materi; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.materi (
    id_materi integer NOT NULL,
    nama_materi character varying(255) NOT NULL,
    deskripsi character varying(255)
);


ALTER TABLE public.materi OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 17934)
-- Name: materi_id_materi_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.materi_id_materi_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.materi_id_materi_seq OWNER TO postgres;

--
-- TOC entry 4895 (class 0 OID 0)
-- Dependencies: 228
-- Name: materi_id_materi_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.materi_id_materi_seq OWNED BY public.materi.id_materi;


--
-- TOC entry 220 (class 1259 OID 17899)
-- Name: presensi; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.presensi (
    id_presensi integer NOT NULL,
    id_materi integer NOT NULL,
    id_jadwal integer NOT NULL,
    id_user integer,
    id_kelas integer,
    jam_started integer,
    jam_ended integer,
    id_mapel integer,
    presensi_mulai timestamp without time zone NOT NULL,
    presensi_selesai timestamp without time zone
);


ALTER TABLE public.presensi OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 18044)
-- Name: presensi_id_mapel_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.presensi_id_mapel_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.presensi_id_mapel_seq OWNER TO postgres;

--
-- TOC entry 4896 (class 0 OID 0)
-- Dependencies: 233
-- Name: presensi_id_mapel_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.presensi_id_mapel_seq OWNED BY public.presensi.id_mapel;


--
-- TOC entry 219 (class 1259 OID 17898)
-- Name: presensi_id_presensi_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.presensi_id_presensi_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.presensi_id_presensi_seq OWNER TO postgres;

--
-- TOC entry 4897 (class 0 OID 0)
-- Dependencies: 219
-- Name: presensi_id_presensi_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.presensi_id_presensi_seq OWNED BY public.presensi.id_presensi;


--
-- TOC entry 231 (class 1259 OID 17944)
-- Name: siswa; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.siswa (
    nis integer NOT NULL,
    rfid character varying(255) NOT NULL,
    nama character varying(50) NOT NULL,
    id_kelas integer NOT NULL
);


ALTER TABLE public.siswa OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 17943)
-- Name: siswa_nis_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.siswa_nis_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.siswa_nis_seq OWNER TO postgres;

--
-- TOC entry 4898 (class 0 OID 0)
-- Dependencies: 230
-- Name: siswa_nis_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.siswa_nis_seq OWNED BY public.siswa.nis;


--
-- TOC entry 218 (class 1259 OID 17890)
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id_user integer NOT NULL,
    username character varying(255) NOT NULL,
    nama character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    level smallint NOT NULL,
    refresh_token text
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 17889)
-- Name: user_id_user_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_user_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_id_user_seq OWNER TO postgres;

--
-- TOC entry 4899 (class 0 OID 0)
-- Dependencies: 217
-- Name: user_id_user_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_user_seq OWNED BY public."user".id_user;


--
-- TOC entry 4682 (class 2604 OID 17909)
-- Name: det_presensi id_det; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.det_presensi ALTER COLUMN id_det SET DEFAULT nextval('public.det_presensi_id_det_seq'::regclass);


--
-- TOC entry 4683 (class 2604 OID 17916)
-- Name: jurusan id_jurusan; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jurusan ALTER COLUMN id_jurusan SET DEFAULT nextval('public.jurusan_id_jurusan_seq'::regclass);


--
-- TOC entry 4684 (class 2604 OID 18018)
-- Name: kelas id_kelas; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kelas ALTER COLUMN id_kelas SET DEFAULT nextval('public.kelas_id_kelas_seq'::regclass);


--
-- TOC entry 4685 (class 2604 OID 17930)
-- Name: mapel id_mapel; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mapel ALTER COLUMN id_mapel SET DEFAULT nextval('public.mapel_id_mapel_seq'::regclass);


--
-- TOC entry 4687 (class 2604 OID 17938)
-- Name: materi id_materi; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.materi ALTER COLUMN id_materi SET DEFAULT nextval('public.materi_id_materi_seq'::regclass);


--
-- TOC entry 4681 (class 2604 OID 17902)
-- Name: presensi id_presensi; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.presensi ALTER COLUMN id_presensi SET DEFAULT nextval('public.presensi_id_presensi_seq'::regclass);


--
-- TOC entry 4688 (class 2604 OID 17947)
-- Name: siswa nis; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.siswa ALTER COLUMN nis SET DEFAULT nextval('public.siswa_nis_seq'::regclass);


--
-- TOC entry 4680 (class 2604 OID 17893)
-- Name: user id_user; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN id_user SET DEFAULT nextval('public.user_id_user_seq'::regclass);


--
-- TOC entry 4874 (class 0 OID 17906)
-- Dependencies: 222
-- Data for Name: det_presensi; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.det_presensi (id_det, id_presensi, id_siswa, keterangan, present_at) FROM stdin;
85	8	18766	S	\N
\.


--
-- TOC entry 4876 (class 0 OID 17913)
-- Dependencies: 224
-- Data for Name: jurusan; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.jurusan (id_jurusan, nama_jurusan, akronim) FROM stdin;
1	Teknik Jaringan Komputer dan Telekomunikasi	TJKT
2	Teknik Mesin	TM
3	Teknik Kendaraan Ringan	TKR
4	Teknik Instalasi Tenaga Listrik	TITL
5	Teknik Las	LAS
6	Teknik Otomasi Industri	TOI
7	Desain Komunikasi Visual	DKV
8	Kimia Analisis	KA
9	Broadcasting TV & Film	BCPF
\.


--
-- TOC entry 4877 (class 0 OID 17920)
-- Dependencies: 225
-- Data for Name: kelas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.kelas (id_jurusan, tingkat, no_kelas, id_kelas) FROM stdin;
1	XII	1	33
\.


--
-- TOC entry 4879 (class 0 OID 17927)
-- Dependencies: 227
-- Data for Name: mapel; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.mapel (id_mapel, nama_mapel, produktif) FROM stdin;
1	Psikoterapi	0
2	Psikoterapi	0
\.


--
-- TOC entry 4881 (class 0 OID 17935)
-- Dependencies: 229
-- Data for Name: materi; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.materi (id_materi, nama_materi, deskripsi) FROM stdin;
54	Polymorism	12 siswa ikut lomba
55	Polymorism	12 siswa ikut lomba
56	Polymorism	12 siswa ikut lomba
\.


--
-- TOC entry 4872 (class 0 OID 17899)
-- Dependencies: 220
-- Data for Name: presensi; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.presensi (id_presensi, id_materi, id_user, id_kelas, jam_started, jam_ended, created_at, id_mapel) FROM stdin;
8	56	7	33	2	4	2025-06-23 18:54:48	1
\.


--
-- TOC entry 4883 (class 0 OID 17944)
-- Dependencies: 231
-- Data for Name: siswa; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.siswa (nis, rfid, nama, id_kelas) FROM stdin;
18766	123098123098	Riki	33
\.


--
-- TOC entry 4870 (class 0 OID 17890)
-- Dependencies: 218
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id_user, username, nama, password, level, refresh_token) FROM stdin;
7	maiww	awoo	$2b$10$Odg21djWsCWtmK4Ka2VzkeF7A3.l.W/4LhRr3XRpCpi2JurxOot5m	0	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywidXNlcm5hbWUiOiJtYWl3dyIsImxldmVsIjowLCJpYXQiOjE3MzA3MjY2MzYsImV4cCI6MTczMDgxMzAzNn0.e4NgcnVnjs28GHxqHQEoC8dsQ5b3TvuMZodhCXus5y8
8	winter	maulana	$2b$10$XLsyrJBUGlb45eQvU9j9we0vO6qBuiKz8sDN9YnTohihGWDHO80Ku	0	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwidXNlcm5hbWUiOiJ3aW50ZXIiLCJsZXZlbCI6MCwiaWF0IjoxNzMwOTg2ODcwLCJleHAiOjE3MzEwNzMyNzB9.GmUc9C39ZFFqzbBHPyEE-80MS2aZAGfV7VE26RgBye0
5	rikiriki	Riki	$2b$10$D4YbGSQHknGyCwSjm8XRXeFOimQ89txF0AH1lWNr8nBiJShhXtVoe	0	
4	BE	M. Bahrun Ni'am	$2b$10$BelKOkJ/CVWgUwVl6mM0mebmMqO6sYubbF/SmyG1rFWZOzb9tTcOS	0	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJiYWhydW4iLCJsZXZlbCI6MCwiaWF0IjoxNzQ5OTA5NDMyLCJleHAiOjE3NDk5OTU4MzJ9.8nZFa-MznlkBpyY0_xPAQuKdS9RtCAh0CygmUc3rRJ0
3	admin	Atmin	$2b$10$U6jtg55yuo0sH0hLaBqgf.7rq3jZmjuV.e.8aq3z2fFRb2aMUon/e	1	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhZG1pbiIsImxldmVsIjoxLCJpYXQiOjE3NTA2ODYwMDksImV4cCI6MTc1MDc3MjQwOX0.pGBESpr7_NmTlIwsJkYAV1xLvmLaBNZEJh4Z6vW5zOE
1	useradmin	Administrator	$2b$10$g/BQYhmfEgYTAn3yfrUrheZgZp2.CJ7EJvwIjb.g6yXJgeThmmLpW	1	\N
\.


--
-- TOC entry 4900 (class 0 OID 0)
-- Dependencies: 221
-- Name: det_presensi_id_det_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.det_presensi_id_det_seq', 85, true);


--
-- TOC entry 4901 (class 0 OID 0)
-- Dependencies: 223
-- Name: jurusan_id_jurusan_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.jurusan_id_jurusan_seq', 1, false);


--
-- TOC entry 4902 (class 0 OID 0)
-- Dependencies: 232
-- Name: kelas_id_kelas_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.kelas_id_kelas_seq', 33, true);


--
-- TOC entry 4903 (class 0 OID 0)
-- Dependencies: 226
-- Name: mapel_id_mapel_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.mapel_id_mapel_seq', 2, true);


--
-- TOC entry 4904 (class 0 OID 0)
-- Dependencies: 228
-- Name: materi_id_materi_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.materi_id_materi_seq', 56, true);


--
-- TOC entry 4905 (class 0 OID 0)
-- Dependencies: 233
-- Name: presensi_id_mapel_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.presensi_id_mapel_seq', 5, true);


--
-- TOC entry 4906 (class 0 OID 0)
-- Dependencies: 219
-- Name: presensi_id_presensi_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.presensi_id_presensi_seq', 8, true);


--
-- TOC entry 4907 (class 0 OID 0)
-- Dependencies: 230
-- Name: siswa_nis_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.siswa_nis_seq', 1, false);


--
-- TOC entry 4908 (class 0 OID 0)
-- Dependencies: 217
-- Name: user_id_user_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_user_seq', 1, true);


--
-- TOC entry 4698 (class 2606 OID 17911)
-- Name: det_presensi det_presensi_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.det_presensi
    ADD CONSTRAINT det_presensi_pkey PRIMARY KEY (id_det);


--
-- TOC entry 4701 (class 2606 OID 17918)
-- Name: jurusan jurusan_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jurusan
    ADD CONSTRAINT jurusan_pkey PRIMARY KEY (id_jurusan);

SET default_tablespace = '';

ALTER TABLE ONLY public.jadwal
    ADD CONSTRAINT jadwal_kelas_foreign FOREIGN KEY (id_kelas) REFERENCES public.kelas(id_kelas);

ALTER TABLE ONLY public.jadwal
    ADD CONSTRAINT jadwal_mapel_foreign FOREIGN KEY (id_mapel) REFERENCES public.mapel(id_mapel);

ALTER TABLE ONLY public.jadwal
    ADD CONSTRAINT jadwal_ruang_foreign FOREIGN KEY (id_ruang) REFERENCES public.ruang(id_ruang);

ALTER TABLE ONLY public.jadwal
    ADD CONSTRAINT jadwal_user_foreign FOREIGN KEY (id_user) REFERENCES public."user"(id_user);
-- TOC entry 4706 (class 2606 OID 17933)
-- Name: mapel mapel_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mapel
    ADD CONSTRAINT mapel_pkey PRIMARY KEY (id_mapel);


--
-- TOC entry 4708 (class 2606 OID 17942)
-- Name: materi materi_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.materi
    ADD CONSTRAINT materi_pkey PRIMARY KEY (id_materi);


--
-- TOC entry 4710 (class 2606 OID 17958)
-- Name: siswa nis; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.siswa
    ADD CONSTRAINT nis UNIQUE (nis);


--
-- TOC entry 4695 (class 2606 OID 17904)
-- Name: presensi presensi_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.presensi
    ADD CONSTRAINT presensi_pkey PRIMARY KEY (id_presensi);


--
-- TOC entry 4712 (class 2606 OID 17960)
-- Name: siswa rfid; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.siswa
    ADD CONSTRAINT rfid UNIQUE (rfid);


--
-- TOC entry 4715 (class 2606 OID 17949)
-- Name: siswa siswa_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.siswa
    ADD CONSTRAINT siswa_pkey PRIMARY KEY (nis);


--
-- TOC entry 4690 (class 2606 OID 17897)
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id_user);


--
-- TOC entry 4696 (class 1259 OID 17950)
-- Name: det_presensi_foreign; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX det_presensi_foreign ON public.det_presensi USING btree (id_presensi);


--
-- TOC entry 4699 (class 1259 OID 17951)
-- Name: det_siswa_foreign; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX det_siswa_foreign ON public.det_presensi USING btree (id_siswa);


--
-- TOC entry 4702 (class 1259 OID 17952)
-- Name: kelas_jurusan_foreign; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX kelas_jurusan_foreign ON public.kelas USING btree (id_jurusan);


--
-- TOC entry 4691 (class 1259 OID 17955)
-- Name: presensi_guru_foreign; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX presensi_guru_foreign ON public.presensi USING btree (id_user);


--
-- TOC entry 4692 (class 1259 OID 17956)
-- Name: presensi_kelas_foreign; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX presensi_kelas_foreign ON public.presensi USING btree (id_kelas);


--
-- TOC entry 4693 (class 1259 OID 17954)
-- Name: presensi_mapel_foreign; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX presensi_mapel_foreign ON public.presensi USING btree (id_materi);


--
-- TOC entry 4713 (class 1259 OID 17961)
-- Name: siswa_kelas_foreign; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX siswa_kelas_foreign ON public.siswa USING btree (id_kelas);


--
-- TOC entry 4720 (class 2606 OID 17962)
-- Name: det_presensi det_presensi_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.det_presensi
    ADD CONSTRAINT det_presensi_foreign FOREIGN KEY (id_presensi) REFERENCES public.presensi(id_presensi);


--
-- TOC entry 4721 (class 2606 OID 17967)
-- Name: det_presensi det_siswa_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.det_presensi
    ADD CONSTRAINT det_siswa_foreign FOREIGN KEY (id_siswa) REFERENCES public.siswa(nis);


--
-- TOC entry 4722 (class 2606 OID 17972)
-- Name: kelas kelas_jurusan_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kelas
    ADD CONSTRAINT kelas_jurusan_foreign FOREIGN KEY (id_jurusan) REFERENCES public.jurusan(id_jurusan);


--
-- TOC entry 4716 (class 2606 OID 17982)
-- Name: presensi presensi_ibfk_1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.presensi
    ADD CONSTRAINT presensi_ibfk_1 FOREIGN KEY (id_user) REFERENCES public."user"(id_user) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4717 (class 2606 OID 18025)
-- Name: presensi presensi_kelas_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.presensi
    ADD CONSTRAINT presensi_kelas_foreign FOREIGN KEY (id_kelas) REFERENCES public.kelas(id_kelas) NOT VALID;


--
-- TOC entry 4718 (class 2606 OID 18053)
-- Name: presensi presensi_mapel_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.presensi
    ADD CONSTRAINT presensi_mapel_foreign FOREIGN KEY (id_mapel) REFERENCES public.mapel(id_mapel) NOT VALID;


--
-- TOC entry 4719 (class 2606 OID 17992)
-- Name: presensi presensi_materi_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.presensi
    ADD CONSTRAINT presensi_materi_foreign FOREIGN KEY (id_materi) REFERENCES public.materi(id_materi);


--
-- TOC entry 4723 (class 2606 OID 18030)
-- Name: siswa siswa_kelas_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.siswa
    ADD CONSTRAINT siswa_kelas_foreign FOREIGN KEY (id_kelas) REFERENCES public.kelas(id_kelas) NOT VALID;


ALTER TABLE ONLY public.jadwal
    ADD CONSTRAINT jadwal_kelas_foreign FOREIGN KEY (id_kelas) REFERENCES public.kelas(id_kelas);


ALTER TABLE ONLY public.jadwal
    ADD CONSTRAINT jadwal_mapel_foreign FOREIGN KEY (id_mapel) REFERENCES public.mapel(id_mapel);


ALTER TABLE ONLY public.jadwal
    ADD CONSTRAINT jadwal_ruang_foreign FOREIGN KEY (id_ruang) REFERENCES public.ruang(id_ruang);


ALTER TABLE ONLY public.jadwal
    ADD CONSTRAINT jadwal_user_foreign FOREIGN KEY (id_user) REFERENCES public."user"(id_user);


-- Completed on 2025-06-23 20:58:04

--
-- PostgreSQL database dump complete
--

