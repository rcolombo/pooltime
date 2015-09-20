--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

--
-- Name: games_id_seq; Type: SEQUENCE; Schema: public; Owner: jz
--

CREATE SEQUENCE games_id_seq
    START WITH 1000
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.games_id_seq OWNER TO jz;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: games; Type: TABLE; Schema: public; Owner: jz; Tablespace: 
--

CREATE TABLE games (
    id integer DEFAULT nextval('games_id_seq'::regclass) NOT NULL,
    week integer,
    home character varying(32),
    away character varying(32),
    home_score integer,
    away_score integer,
    spread double precision
);


ALTER TABLE public.games OWNER TO jz;

--
-- Name: selections; Type: TABLE; Schema: public; Owner: jz; Tablespace: 
--

CREATE TABLE selections (
    game_id integer NOT NULL,
    user_id integer NOT NULL,
    team character varying(32)
);


ALTER TABLE public.selections OWNER TO jz;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: jz
--

CREATE SEQUENCE users_id_seq
    START WITH 1000
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO jz;

--
-- Name: users; Type: TABLE; Schema: public; Owner: jz; Tablespace: 
--

CREATE TABLE users (
    id integer DEFAULT nextval('users_id_seq'::regclass) NOT NULL,
    name character varying(32)
);


ALTER TABLE public.users OWNER TO jz;

--
-- Data for Name: games; Type: TABLE DATA; Schema: public; Owner: jz
--

COPY games (id, week, home, away, home_score, away_score, spread) FROM stdin;
124	7	Pittsburgh	Houston	30	23	-3
96	1	Seattle	Green Bay	36	16	-6.5
8	1	Chicago	Buffalo	20	23	-7
10	1	Pittsburgh	Cleveland	30	27	-6.5
102	6	Tampa Bay	Baltimore	17	48	3.5
5	1	Miami	New England	33	20	3.5
3	1	Atlanta	New Orleans	37	34	3
14	1	Tampa Bay	Carolina	14	20	-2.5
17	1	Denver	Indianapolis	31	24	-7.5
18	1	Detroit	N.Y Giants	35	14	-6.5
12	1	Baltimore	Cincinnati	16	23	-2
48	3	Miami	Kansas City	15	34	-4
13	1	St. Louis	Minnesota	6	34	-3
7	1	N.Y. Jets	Oakland	19	14	-5
16	1	Dallas	San Francisco	17	28	3.5
19	1	Arizona	San Diego	18	17	-3
9	1	Kansas City	Tennessee	10	26	-3
11	1	Houston	Washington	17	6	-3
20	2	Baltimore	Pittsburgh	26	6	-2.5
23	2	Buffalo	Miami	29	10	-1
22	2	Carolina	Detroit	24	7	-1
21	2	Tennessee	Dallas	10	26	-3.5
24	2	Minnesota	New England	7	30	3.5
29	2	San Diego	Seattle	30	21	4.5
31	2	Denver	Kansas City	24	17	-13
32	2	Oakland	Houston	14	30	3
35	2	Indianapolis	Philadelphia	27	30	-3
25	2	Cleveland	New Orleans	26	24	5
26	2	Cincinnati	Atlanta	24	10	-5
27	2	Washington	Jacksonville	41	10	-5
51	3	N.Y. Jets	Chicago	19	27	-3
30	2	Tampa Bay	St. Louis	17	19	-4
33	2	Green Bay	N.Y. Jets	31	24	-7.5
34	2	San Francisco	Chicago	20	28	-7
28	2	N.Y. Giants	Arizona	14	25	-2
36	3	Atlanta	Tampa Bay	56	14	-6.5
43	3	Buffalo	San Diego	10	22	-2.5
38	3	Cincinnati	Tennessee	33	7	-6.5
37	3	Detroit	Green Bay	19	7	-1
44	3	Jacksonville	Indianapolis	17	44	7
41	3	New England	Oakland	16	9	-14
47	3	Arizona	San Francisco	23	14	3
46	3	Cleveland	Baltimore	21	23	1
39	3	St. Louis	Dallas	31	34	2
42	3	N.Y. Giants	Houston	30	17	-1
45	3	New Orleans	Minnesota	20	9	-10
40	3	Philadelphia	Washington	37	34	-4.5
49	3	Seattle	Denver	26	20	-4
50	3	Carolina	Pittsburgh	19	37	-3
78	4	Washington	N.Y. Giants	14	45	-3.5
65	4	Houston	Buffalo	23	17	-3
69	4	Indianapolis	Tennessee	41	17	-7.5
66	4	Pittsburgh	Tampa Bay	24	27	-7.5
74	4	Minnesota	Atlanta	41	28	4
76	4	Dallas	New Orleans	38	17	3
77	4	Kansas City	New England	41	14	3
70	4	Baltimore	Carolina	38	10	-3.5
68	4	N.Y. Jets	Detroit	17	24	-1
67	4	Oakland	Miami	14	38	3.5
73	4	San Diego	Jacksonville	33	14	-13
75	4	San Francisco	Philadelphia	26	21	-4
71	4	Chicago	Green Bay	17	38	1.5
81	5	Green Bay	Minnesota	42	10	-8.5
87	5	Detroit	Buffalo	14	17	-5.5
85	5	Tennessee	Cleveland	28	29	1
83	5	Dallas	Houston	20	17	-6
86	5	New Orleans	Tampa Bay	37	31	-10
84	5	Philadelphia	St. Louis	34	28	-4.5
91	5	San Francisco	Kansas City	22	17	-4
93	5	New England	Cincinnati	43	17	2.5
94	5	Washington	Seattle	17	27	7.5
95	5	Indianapolis	Baltimore	20	13	-3
88	5	Carolina	Chicago	31	24	-2
89	5	Jacksonville	Pittsburgh	9	17	6
82	5	N.Y. Giants	Atlanta	30	20	-4.5
90	5	Denver	Arizona	41	20	-7.5
92	5	San Diego	N.Y. Jets	31	0	-6
99	6	Minnesota	Detroit	3	17	-1.5
100	6	Miami	Green Bay	24	27	2.5
98	6	N.Y. Jets	Denver	17	31	10
6	1	Philadelphia	Jacksonville	34	17	-10.5
101	6	Tennessee	Jacksonville	16	14	-4
97	6	Cleveland	Pittsburgh	31	10	-2
103	6	Buffalo	New England	22	37	1
104	6	Cincinnati	Carolina	37	37	-7
105	6	Oakland	San Diego	28	31	7
107	6	Seattle	Dallas	23	30	-8.5
106	6	Atlanta	Chicago	13	27	-3
108	6	Arizona	Washington	30	20	-5
109	6	Philadelphia	N.Y. Giants	27	0	-2
115	7	Jacksonville	Cleveland	24	6	4
113	7	Chicago	Miami	14	27	-3
119	7	Washington	Tennessee	19	17	-6
116	7	Baltimore	Atlanta	29	7	-6.5
114	7	Green Bay	Carolina	38	17	-6.5
112	7	Indianapolis	Cincinnati	27	0	-3
111	7	St. Louis	Seattle	28	26	6.5
121	7	Oakland	Arizona	13	24	3.5
122	7	Dallas	N.Y. Giants	31	21	-5
123	7	Denver	San Francisco	42	17	-6.5
110	6	St. Louis	San Francisco	17	31	3
117	7	Buffalo	Minnesota	17	16	-6.5
118	7	Detroit	New Orleans	24	23	-1
120	7	San Diego	Kansas City	20	23	-3
141	8	Dallas	Washington	17	20	-10
125	7	New England	N.Y. Jets	27	25	-9.5
126	6	Houston	Indianapolis	28	33	-3.5
127	8	Denver	San Diego	35	21	-9
136	8	Tampa Bay	Minnesota	13	19	-2.5
138	8	Cleveland	Oakland	23	13	-6.5
137	8	Arizona	Philadelphia	24	20	-1.5
139	8	Pittsburgh	Indianapolis	51	34	3.5
128	8	Atlanta	Detroit	21	22	3.5
135	8	Kansas City	St. Louis	34	7	-7
129	8	Cincinnati	Baltimore	27	24	2
134	8	New England	Chicago	51	23	-5.5
130	8	N.Y. Jets	Buffalo	23	43	-3
132	8	Jacksonsville	Miami	13	27	6.5
131	8	Carolina	Seattle	9	13	5.5
133	8	Tennessee	Houston	16	30	3.5
140	8	New Orleans	Green Bay	44	23	-2.5
146	10	New Orleans	San Francisco	24	27	-5.5
163	9	Cincinnati	Jacksonville	33	23	-10
149	10	Oakland	Denver	17	41	12
151	10	Seattle	N.Y. Giants	38	17	-10
150	10	Arizona	St. Louis	31	14	-7
152	10	Green Bay	Chicago	55	14	-8
185	12	New England	Detroit	34	9	-7.5
168	11	Cleveland	Houston	7	23	-4.5
169	11	Miami	Buffalo	22	9	-4.5
170	11	Chicago	Minnesota	21	13	-2.5
171	11	Kansas City	Seattle	24	20	1
172	11	Carolina	Atlanta	17	19	2.5
173	11	New Orleans	Cincinnati	10	27	-8.5
174	11	Washington	Tampa Bay	7	27	-6.5
175	11	St. Louis	Denver	22	7	8
154	10	Cincinnati	Cleveland	3	24	-6.5
145	10	Baltimore	Tennessee	21	7	-10.5
144	10	N.Y. Jets	Pittsburgh	20	13	3.5
142	10	Buffalo	Kansas City	13	17	1.5
147	10	Detroit	Miami	20	16	-3
143	10	Jacksonville	Dallas	17	31	7.5
148	10	Tampa Bay	Atlanta	17	27	3
176	11	N.Y. Giants	San Francisco	10	16	4
177	11	San Diego	Oakland	13	6	-10.5
178	11	Arizona	Detroit	14	6	1
179	11	Green Bay	Philadelphia	53	20	-5
180	11	Indianapolis	New England	20	42	-3
155	9	Carolina	New Orleans	10	28	3.5
156	9	Cleveland	Tampa Bay	22	17	-7
157	9	Dallas	Arizona	17	28	-1.5
158	9	Kansas City	N.Y. Jets	24	10	-8
159	9	Minnesota	Washington	29	26	-1
160	9	New England	Denver	43	21	3
161	9	Pittsburgh	Baltimore	43	23	1
162	9	N.Y. Giants	Indianapolis	24	40	3
164	9	Houston	Philadelphia	21	31	2
165	9	Miami	San Diego	37	0	-3
166	9	San Francisco	St. Louis	10	13	-11
167	9	Seattle	Oakland	30	24	-12.5
182	12	Oakland	Kansas City	24	20	7.5
189	12	Chicago	Tampa Bay	21	13	-4
187	12	Indianapolis	Jacksonville	23	3	-13.5
183	12	Atlanta	Cleveland	24	26	-3
188	12	Houston	Cincinnati	13	22	-2.5
186	12	Minnesota	Green Bay	21	24	7.5
184	12	Philadelphia	Tennessee	43	24	-12
153	10	Philadelphia	Carolina	45	21	-7
181	11	Tennessee	Pittsburgh	24	27	5.5
190	12	Seattle	Arizona	19	3	-7.5
191	12	San Diego	St. Louis	27	24	-5.5
193	12	San Francisco	Washington	17	13	-9
192	12	Denver	Miami	39	36	-6
194	12	N.Y. Giants	Dallas	28	31	4
196	12	Buffalo	N.Y. Jets	38	3	-1.5
195	12	New Orleans	Baltimore	27	34	-3
210	14	San Diego	New England	14	23	3.5
211	14	Green Bay	Atlanta	43	37	-13
212	14	Chicago	Dallas	28	41	3.5
205	14	Minnesota	N.Y. Jets	30	24	-5
204	14	Washington	St. Louis	0	24	3
201	14	Tennessee	N.Y. Giants	7	36	1.5
197	14	Miami	Baltimore	13	28	-3
198	14	Cincinnati	Pittsburgh	21	42	-3
199	14	Cleveland	Indianapolis	24	25	3
200	14	Jacksonville	Houston	13	27	5.5
202	14	New Orleans	Carolina	10	41	-10
203	14	Detroit	Tampa Bay	34	17	-10.5
206	14	Denver	Buffalo	24	17	-10
207	14	Arizona	Kansas City	17	14	2
208	14	Oakland	San Francisco	24	13	8.5
209	14	Philadelphia	Seattle	14	24	-1
1063	\N	\N	\N	\N	\N	-14
1064	\N	\N	\N	\N	\N	2.5
1065	\N	\N	\N	\N	\N	-7
1066	\N	\N	\N	\N	\N	-1
1067	\N	\N	\N	\N	\N	-7.5
1068	\N	\N	\N	\N	\N	-3
1069	\N	\N	\N	\N	\N	-7
1070	\N	\N	\N	\N	\N	4
1071	\N	\N	\N	\N	\N	-7.5
1072	\N	\N	\N	\N	\N	3
1073	\N	\N	\N	\N	\N	4.5
1074	\N	\N	\N	\N	\N	-10
1075	\N	\N	\N	\N	\N	-3.5
1076	\N	\N	\N	\N	\N	3
1012	15	St. Louis	Arizona	6	12	-6
1062	\N	\N	\N	\N	\N	-10.5
1077	15	San Diego	Denver	10	22	4
1086	15	Carolina	Tampy Bay	19	17	-3.5
1083	15	Indianapolis	Houston	17	10	-7
1085	15	Atlanta	Pittsburgh	20	27	3
1084	15	Baltimore	Jacksonville	20	12	-14
1080	15	Detroit	Minnesota	16	14	-7.5
1087	15	Buffalo	Green Bay	21	13	3
1081	15	Cleveland	Cincinnati	0	30	-2.5
1079	15	Tennessee	N.Y. Jets	11	16	3
1078	15	Chicago	New Orleans	15	31	3
1090	15	New England	Miami	41	13	-9.5
1091	15	Philadelphia	Dallas	27	38	-3.5
1117	16	Houston	Baltimore	25	13	5.5
1111	16	Miami	Minnesota	37	35	-4.5
1112	16	Tampa Bay	Green Bay	3	20	10
1109	16	San Francisco	San Diego	35	38	-1
1141	17	New England	Buffalo	9	17	-5.5
1089	15	N.Y. Giants	Washington	24	13	-7
1082	15	Kansas City	Oakland	31	13	-11
1088	15	Seattle	San Francisco	17	7	-10
1092	13	Detroit	Chicago	34	17	-7
1093	13	Dallas	Philadelphia	10	33	-3
1094	13	San Francisco	Seattle	3	19	-1
1095	13	Jacksonville	N.Y. Giants	25	24	2.5
1096	13	Indianapolis	Washington	49	27	-8.5
1097	13	Houston	Tennessee	45	21	-7
1098	13	Buffalo	Cleveland	26	10	-3
1099	13	Baltimore	San Diego	33	34	-6.5
1100	13	Tampa Bay	Cincinatti	13	14	5.5
1101	13	St. Louis	Oakland	52	0	-5.5
1102	13	Pittsburgh	New Orleans	32	35	-3.5
1103	13	Minnesota	Carolina	31	13	-2.5
1104	13	Atlanta	Arizona	29	18	1.5
1105	13	Green Bay	New England	26	21	-2.5
1106	13	Kansas City	Denver	16	29	-1
1107	13	N.Y. Jets	Miami	13	16	7
1143	17	Atlanta	Carolina	3	34	-3
1144	17	Minnesota	Chicago	13	9	-7
1115	16	N.Y. Jets	New England	16	17	10
1136	17	Green Bay	Detroit	30	20	-7.5
1114	16	New Orleans	Atlanta	14	30	-5.5
1113	16	Chicago	Detroit	14	20	10
1123	16	Carolina	Cleveland	17	13	-5.5
1137	17	Houston	Jacksonville	23	17	-7.5
1138	17	Pittsburgh	Cincinnati	20	10	-3.5
1120	16	Dallas	Indianapolis	42	7	-3.5
1119	16	Oakland	Buffalo	26	24	7
1118	16	St. Louis	N.Y. Giants	27	37	-6.5
1139	17	Tennessee	Indianapolis	10	27	7.5
1121	16	Arizona	Seattle	6	28	8.5
1140	17	Baltimore	Cleveland	20	10	-14
1116	16	Pittsburgh	Kansas City	20	12	-3.5
1108	16	Jacksonville	Tennessee	21	13	-4.5
1110	16	Washington	Philadelphia	27	24	4
1146	17	N.Y. Giants	Philadelphia	26	34	1
1122	16	Cincinnati	Denver	37	28	3
1142	17	Miami	N.Y. Jets	24	37	-7
1145	17	Kansas City	San Diego	19	7	-3
1147	17	Washington	Dallas	17	44	6
1148	17	Tampa Bay	New Orleans	20	23	5.5
1150	17	San Francisco	Arizona	20	17	-7
1149	17	Seattle	St. Louis	20	6	-11
1151	17	Denver	Oakland	47	14	-14
\.


--
-- Name: games_id_seq; Type: SEQUENCE SET; Schema: public; Owner: jz
--

SELECT pg_catalog.setval('games_id_seq', 1157, true);


--
-- Data for Name: selections; Type: TABLE DATA; Schema: public; Owner: jz
--

COPY selections (game_id, user_id, team) FROM stdin;
11	4	Houston
10	4	Cleveland
13	4	Minnesota
12	4	Cincinnati
14	4	Tampa Bay
17	4	Denver
16	4	Dallas
19	4	San Diego
18	4	N.Y Giants
3	4	New Orleans
5	4	Miami
7	4	N.Y. Jets
6	4	Jacksonville
9	4	Kansas City
8	4	Chicago
11	3	Washington
10	3	Pittsburgh
13	3	St. Louis
12	3	Baltimore
14	3	Tampa Bay
17	3	Denver
16	3	San Francisco
19	3	San Diego
18	3	Detroit
3	3	Atlanta
5	3	New England
7	3	N.Y. Jets
6	3	Jacksonville
9	3	Kansas City
8	3	Buffalo
11	5	Washington
10	5	Cleveland
13	5	Minnesota
12	5	Cincinnati
14	5	Tampa Bay
17	5	Denver
16	5	Dallas
19	5	San Diego
18	5	N.Y Giants
3	5	New Orleans
5	5	New England
7	5	Oakland
6	5	Philadelphia
9	5	Kansas City
8	5	Chicago
24	4	New England
25	4	New Orleans
26	4	Atlanta
27	4	Jacksonville
20	4	Pittsburgh
21	4	Dallas
22	4	Detroit
23	4	Miami
33	4	Green Bay
32	4	Houston
31	4	Kansas City
30	4	St. Louis
28	4	N.Y. Giants
29	4	San Diego
35	4	Philadelphia
34	4	Chicago
24	3	New England
25	3	New Orleans
26	3	Atlanta
27	3	Jacksonville
20	3	Baltimore
21	3	Dallas
22	3	Carolina
23	3	Buffalo
33	3	N.Y. Jets
32	3	Houston
31	3	Kansas City
30	3	Tampa Bay
28	3	Arizona
29	3	Seattle
35	3	Philadelphia
34	3	San Francisco
24	5	New England
25	5	New Orleans
26	5	Atlanta
27	5	Jacksonville
20	5	Pittsburgh
21	5	Dallas
22	5	Detroit
23	5	Miami
33	5	Green Bay
32	5	Oakland
31	5	Denver
30	5	Tampa Bay
28	5	N.Y. Giants
29	5	San Diego
35	5	Philadelphia
34	5	Chicago
42	3	N.Y. Giants
36	3	Atlanta
39	3	Dallas
38	3	Cincinnati
48	3	Miami
49	3	Seattle
46	3	Cleveland
47	3	San Francisco
44	3	Jacksonville
45	3	New Orleans
51	3	Chicago
43	3	Buffalo
40	3	Philadelphia
41	3	Oakland
37	3	Green Bay
50	3	Carolina
42	5	N.Y. Giants
36	5	Atlanta
39	5	Dallas
38	5	Cincinnati
48	5	Kansas City
49	5	Seattle
46	5	Cleveland
47	5	San Francisco
44	5	Indianapolis
45	5	New Orleans
51	5	Chicago
43	5	San Diego
40	5	Washington
41	5	Oakland
37	5	Detroit
50	5	Carolina
42	4	N.Y. Giants
36	4	Atlanta
39	4	St. Louis
38	4	Cincinnati
48	4	Miami
49	4	Seattle
46	4	Cleveland
47	4	San Francisco
44	4	Indianapolis
22	6	Detroit
23	6	Miami
24	6	New England
25	6	New Orleans
26	6	Atlanta
27	6	Jacksonville
28	6	Arizona
29	6	San Diego
30	6	Tampa Bay
31	6	Kansas City
32	6	Houston
34	6	Chicago
35	6	Indianapolis
3	6	New Orleans
21	6	Tennessee
5	6	New England
6	6	Philadelphia
7	6	N.Y. Jets
8	6	Buffalo
9	6	Kansas City
10	6	Pittsburgh
11	6	Houston
12	6	Baltimore
14	6	Carolina
16	6	San Francisco
17	6	Indianapolis
18	6	Detroit
19	6	San Diego
45	4	New Orleans
51	4	Chicago
43	4	San Diego
40	4	Philadelphia
41	4	Oakland
37	4	Green Bay
50	4	Carolina
74	4	Atlanta
75	4	Philadelphia
55	6	Tennessee
76	4	New Orleans
77	4	Kansas City
78	4	N.Y. Giants
65	3	Buffalo
66	3	Tampa Bay
67	3	Miami
68	3	N.Y. Jets
69	3	Indianapolis
52	5	Buffalo
53	5	Tampa Bay
52	6	Houston
53	6	Tampa Bay
70	3	Carolina
71	3	Green Bay
73	3	Jacksonville
74	3	Atlanta
75	3	Philadelphia
76	3	New Orleans
77	3	New England
78	3	N.Y. Giants
36	6	Atlanta
37	6	Detroit
38	6	Cincinnati
39	6	Dallas
40	6	Washington
41	6	New England
42	6	Houston
43	6	San Diego
44	6	Jacksonville
45	6	New Orleans
46	6	Cleveland
47	6	San Francisco
48	6	Kansas City
67	6	Miami
68	6	Detroit
69	6	Indianapolis
70	6	Carolina
71	6	Green Bay
73	6	Jacksonville
74	6	Atlanta
75	6	San Francisco
76	6	New Orleans
77	6	New England
78	6	N.Y. Giants
98	6	N.Y. Jets
65	6	Houston
20	6	Pittsburgh
33	6	Green Bay
85	5	Cleveland
49	6	Denver
50	6	Carolina
51	6	N.Y. Jets
81	5	Minnesota
92	5	N.Y. Jets
87	4	Detroit
83	6	Dallas
65	5	Buffalo
84	6	Philadelphia
66	5	Tampa Bay
67	5	Oakland
68	5	Detroit
69	5	Indianapolis
70	5	Carolina
71	5	Chicago
73	5	Jacksonville
74	5	Atlanta
75	5	Philadelphia
85	6	Cleveland
76	5	Dallas
77	5	New England
78	5	N.Y. Giants
86	6	Tampa Bay
87	6	Detroit
65	4	Houston
66	4	Pittsburgh
67	4	Miami
68	4	Detroit
69	4	Indianapolis
70	4	Baltimore
71	4	Green Bay
73	4	San Diego
88	6	Chicago
89	6	Pittsburgh
90	6	Arizona
91	6	Kansas City
88	4	Carolina
87	3	Detroit
88	3	Carolina
89	4	Pittsburgh
92	6	San Diego
90	4	Denver
91	4	San Francisco
89	3	Pittsburgh
90	3	Arizona
93	6	New England
91	3	San Francisco
92	3	San Diego
93	3	New England
94	3	Seattle
95	3	Indianapolis
94	6	Washington
95	6	Indianapolis
94	5	Seattle
81	4	Green Bay
82	4	N.Y. Giants
83	4	Dallas
66	6	Pittsburgh
92	4	San Diego
84	4	Philadelphia
93	4	New England
94	4	Seattle
95	4	Indianapolis
81	3	Minnesota
82	3	Atlanta
83	3	Houston
85	4	Tennessee
84	3	Philadelphia
85	3	Tennessee
86	4	New Orleans
86	3	New Orleans
86	5	New Orleans
90	5	Denver
93	5	New England
95	5	Indianapolis
91	5	Kansas City
89	5	Pittsburgh
88	5	Chicago
87	5	Buffalo
84	5	St. Louis
83	5	Houston
82	5	N.Y. Giants
13	6	Minnesota
96	6	Green Bay
82	6	N.Y. Giants
81	6	Green Bay
103	4	New England
101	4	Jacksonville
100	4	Green Bay
99	4	Detroit
101	6	Tennessee
104	4	Carolina
102	4	Tampa Bay
108	6	Washington
109	6	N.Y. Giants
110	6	San Francisco
96	3	Green Bay
96	5	Seattle
96	4	Seattle
115	4	Jacksonville
116	4	Atlanta
117	4	Buffalo
118	4	New Orleans
119	4	Tennessee
97	4	Pittsburgh
98	4	Denver
105	4	San Diego
106	4	Chicago
107	4	Seattle
108	4	Arizona
109	4	N.Y. Giants
110	4	San Francisco
120	4	Kansas City
121	4	Oakland
122	4	N.Y. Giants
123	4	Denver
124	4	Pittsburgh
113	3	Chicago
114	3	Green Bay
115	3	Jacksonville
116	3	Baltimore
117	3	Buffalo
118	3	Detroit
119	3	Tennessee
120	3	San Diego
121	3	Arizona
121	6	Arizona
122	6	N.Y. Giants
123	6	Denver
124	6	Pittsburgh
122	3	Dallas
123	3	Denver
124	3	Houston
125	5	New England
125	3	N.Y. Jets
125	4	N.Y. Jets
125	6	N.Y. Jets
126	3	Indianapolis
126	4	Indianapolis
126	5	Indianapolis
126	6	Indianapolis
97	3	Cleveland
98	3	Denver
99	3	Minnesota
100	3	Green Bay
101	3	Jacksonville
102	3	Tampa Bay
103	3	Buffalo
104	3	Carolina
105	3	San Diego
106	3	Atlanta
107	3	Dallas
108	3	Arizona
109	3	Philadelphia
110	3	St. Louis
111	5	Seattle
112	5	Cincinnati
113	5	Chicago
97	5	Cleveland
114	5	Carolina
115	5	Cleveland
97	6	Pittsburgh
99	6	Minnesota
100	6	Green Bay
102	6	Baltimore
103	6	New England
104	6	Carolina
105	6	San Diego
106	6	Atlanta
107	6	Dallas
98	5	Denver
99	5	Detroit
100	5	Green Bay
101	5	Jacksonville
102	5	Tampa Bay
103	5	New England
104	5	Carolina
105	5	San Diego
106	5	Atlanta
107	5	Dallas
108	5	Washington
109	5	N.Y. Giants
110	5	San Francisco
116	5	Baltimore
117	5	Minnesota
118	5	New Orleans
119	5	Tennessee
120	5	San Diego
121	5	Arizona
122	5	N.Y. Giants
111	4	Seattle
112	4	Indianapolis
113	4	Chicago
114	4	Carolina
139	3	Indianapolis
131	3	Seattle
123	5	Denver
124	5	Houston
111	6	Seattle
112	6	Indianapolis
113	6	Chicago
114	6	Carolina
115	6	Cleveland
116	6	Atlanta
132	6	Jacksonsville
140	3	Green Bay
132	3	Jacksonsville
133	3	Houston
141	3	Dallas
135	5	St. Louis
117	6	Minnesota
118	6	Detroit
119	6	Tennessee
120	6	Kansas City
111	3	Seattle
112	3	Indianapolis
134	3	New England
135	3	Kansas City
127	3	Denver
128	3	Detroit
136	3	Minnesota
129	3	Baltimore
137	3	Arizona
138	3	Cleveland
130	3	Buffalo
140	5	Green Bay
128	6	Detroit
127	5	Denver
133	6	Tennessee
131	6	Seattle
138	5	Oakland
137	5	Arizona
136	5	Tampa Bay
134	5	Chicago
132	5	Miami
130	6	N.Y. Jets
129	6	Cincinnati
131	5	Seattle
130	5	Buffalo
128	5	Detroit
132	4	Jacksonsville
131	4	Seattle
130	4	Buffalo
129	4	Baltimore
129	5	Baltimore
128	4	Detroit
153	6	Carolina
154	6	Cincinnati
142	5	Kansas City
143	5	Dallas
144	5	Pittsburgh
145	5	Tennessee
146	5	New Orleans
147	5	Miami
148	5	Atlanta
149	5	Denver
150	5	St. Louis
151	5	N.Y. Giants
152	5	Chicago
156	4	Tampa Bay
157	4	Arizona
158	4	Kansas City
159	4	Minnesota
127	4	San Diego
133	4	Tennessee
134	4	Chicago
135	4	Kansas City
136	4	Tampa Bay
137	4	Arizona
138	4	Oakland
139	4	Indianapolis
140	4	Green Bay
141	4	Dallas
160	4	New England
133	5	Tennessee
139	5	Pittsburgh
141	5	Dallas
161	4	Pittsburgh
153	5	Carolina
154	5	Cincinnati
142	4	Buffalo
143	4	Jacksonville
144	4	Pittsburgh
145	4	Baltimore
146	4	New Orleans
147	4	Detroit
148	4	Atlanta
149	4	Denver
150	4	Arizona
151	4	N.Y. Giants
152	4	Chicago
153	4	Carolina
154	4	Cincinnati
162	4	N.Y. Giants
127	6	San Diego
134	6	Chicago
135	6	St. Louis
136	6	Minnesota
137	6	Arizona
138	6	Cleveland
139	6	Indianapolis
140	6	Green Bay
141	6	Dallas
163	4	Cincinnati
164	4	Philadelphia
165	4	San Diego
166	4	San Francisco
167	4	Seattle
155	6	New Orleans
156	6	Cleveland
155	3	Carolina
156	3	Cleveland
157	3	Arizona
158	3	Kansas City
159	3	Minnesota
160	3	New England
161	3	Pittsburgh
162	3	N.Y. Giants
164	3	Houston
165	3	Miami
166	3	St. Louis
167	3	Seattle
157	6	Arizona
158	6	N.Y. Jets
159	6	Minnesota
160	6	New England
161	6	Pittsburgh
162	6	N.Y. Giants
180	3	New England
142	3	Buffalo
143	3	Jacksonville
164	6	Philadelphia
144	3	Pittsburgh
145	3	Baltimore
146	3	New Orleans
147	3	Miami
148	3	Tampa Bay
149	3	Denver
150	3	Arizona
151	3	N.Y. Giants
152	3	Green Bay
153	3	Carolina
154	3	Cleveland
142	6	Buffalo
165	6	San Diego
143	6	Jacksonville
144	6	N.Y. Jets
145	6	Tennessee
146	6	San Francisco
147	6	Miami
148	6	Tampa Bay
149	6	Oakland
150	6	St. Louis
151	6	N.Y. Giants
152	6	Chicago
166	6	St. Louis
167	6	Seattle
163	5	Cincinnati
164	5	Philadelphia
171	3	Kansas City
177	3	Oakland
165	5	San Diego
166	5	St. Louis
179	3	Philadelphia
167	5	Seattle
155	5	New Orleans
156	5	Tampa Bay
157	5	Arizona
163	3	Jacksonville
163	6	Jacksonville
155	4	Carolina
158	5	Kansas City
159	5	Washington
160	5	Denver
161	5	Pittsburgh
162	5	N.Y. Giants
176	3	N.Y. Giants
181	3	Pittsburgh
169	3	Miami
175	3	Denver
170	3	Minnesota
178	3	Arizona
174	3	Tampa Bay
173	3	New Orleans
170	5	Chicago
172	3	Carolina
178	5	Detroit
177	5	Oakland
176	5	N.Y. Giants
175	5	Denver
174	5	Tampa Bay
173	5	Cincinnati
172	5	Carolina
171	5	Kansas City
208	3	San Francisco
206	6	Denver
209	3	Philadelphia
210	3	San Diego
197	4	Baltimore
198	4	Pittsburgh
199	4	Indianapolis
182	4	Kansas City
183	4	Cleveland
184	4	Philadelphia
185	4	Detroit
186	4	Green Bay
187	4	Jacksonville
188	4	Cincinnati
189	4	Chicago
190	4	Seattle
168	5	Cleveland
169	5	Miami
179	5	Philadelphia
180	5	New England
181	5	Pittsburgh
200	4	Jacksonville
201	4	N.Y. Giants
202	4	Carolina
203	4	Tampa Bay
204	4	St. Louis
205	4	N.Y. Jets
191	4	San Diego
168	3	Cleveland
192	4	Denver
193	4	San Francisco
194	4	N.Y. Giants
195	4	New Orleans
168	4	Houston
169	4	Buffalo
170	4	Chicago
171	4	Seattle
172	4	Atlanta
173	4	Cincinnati
174	4	Tampa Bay
175	4	Denver
176	4	N.Y. Giants
177	4	San Diego
178	4	Detroit
179	4	Green Bay
180	4	New England
181	4	Pittsburgh
196	4	Buffalo
206	4	Denver
207	4	Kansas City
208	4	San Francisco
182	3	Oakland
183	3	Cleveland
184	3	Tennessee
185	3	Detroit
186	3	Green Bay
187	3	Jacksonville
188	3	Cincinnati
189	3	Chicago
190	3	Arizona
191	3	St. Louis
192	3	Denver
193	3	San Francisco
194	3	N.Y. Giants
195	3	Baltimore
196	3	Buffalo
208	6	San Francisco
197	3	Miami
168	6	Houston
169	6	Miami
170	6	Minnesota
171	6	Seattle
172	6	Carolina
173	6	Cincinnati
174	6	Tampa Bay
175	6	Denver
176	6	N.Y. Giants
182	5	Kansas City
183	5	Cleveland
184	5	Tennessee
177	6	San Diego
178	6	Detroit
182	6	Oakland
183	6	Cleveland
184	6	Tennessee
185	5	Detroit
186	5	Green Bay
187	5	Indianapolis
185	6	Detroit
188	5	Cincinnati
189	5	Chicago
190	5	Arizona
191	5	St. Louis
186	6	Green Bay
187	6	Indianapolis
188	6	Cincinnati
189	6	Chicago
192	5	Miami
193	5	San Francisco
194	5	N.Y. Giants
195	5	Baltimore
196	5	Buffalo
198	3	Pittsburgh
190	6	Arizona
191	6	St. Louis
192	6	Miami
193	6	San Francisco
194	6	N.Y. Giants
195	6	New Orleans
196	6	N.Y. Jets
211	3	Green Bay
212	3	Chicago
179	6	Green Bay
180	6	Indianapolis
181	6	Pittsburgh
209	4	Seattle
210	4	New England
211	4	Green Bay
207	6	Arizona
212	4	Chicago
199	3	Cleveland
200	3	Jacksonville
201	3	N.Y. Giants
202	3	Carolina
203	3	Detroit
204	3	St. Louis
205	3	Minnesota
197	6	Baltimore
198	6	Cincinnati
206	3	Buffalo
205	6	Minnesota
207	3	Arizona
209	6	Seattle
211	6	Atlanta
210	6	New England
212	6	Dallas
199	6	Indianapolis
204	6	St. Louis
203	6	Tampa Bay
202	6	Carolina
201	6	N.Y. Giants
204	5	St. Louis
200	6	Houston
199	5	Indianapolis
203	5	Detroit
202	5	New Orleans
201	5	N.Y. Giants
197	5	Baltimore
198	5	Pittsburgh
200	5	Jacksonville
205	5	N.Y. Jets
206	5	Denver
207	5	Kansas City
208	5	Oakland
209	5	Philadelphia
210	5	New England
211	5	Atlanta
212	5	Chicago
1079	4	N.Y. Jets
1080	4	Detroit
1091	6	Dallas
1080	6	Detroit
1081	4	Cleveland
1082	4	Kansas City
1083	4	Indianapolis
1084	4	Jacksonville
1085	4	Pittsburgh
1083	6	Houston
1087	4	Green Bay
1088	4	Seattle
1089	4	N.Y. Giants
1090	4	New England
1091	4	Dallas
1081	6	Cleveland
1086	6	Carolina
1012	6	St. Louis
1087	6	Green Bay
1012	4	St. Louis
1077	4	Denver
1078	4	Chicago
1077	6	Denver
1078	6	New Orleans
1088	6	Seattle
1089	6	N.Y. Giants
1082	6	Kansas City
1084	6	Jacksonville
1085	6	Pittsburgh
1090	6	Miami
1079	6	Tennessee
1012	5	Arizona
1083	3	Houston
1012	3	St. Louis
1084	3	Jacksonville
1085	3	Pittsburgh
1082	3	Oakland
1077	5	Denver
1078	5	New Orleans
1079	5	Tennessee
1080	5	Detroit
1081	5	Cincinnati
1082	5	Oakland
1083	5	Houston
1084	5	Baltimore
1085	5	Pittsburgh
1086	5	Carolina
1088	5	San Francisco
1089	5	N.Y. Giants
1090	5	Miami
1086	4	Tampa Bay
1091	5	Philadelphia
1113	6	Detroit
1114	6	New Orleans
1115	6	New England
1116	6	Kansas City
1117	6	Houston
1118	6	St. Louis
1092	3	Chicago
1093	3	Philadelphia
1094	3	San Francisco
1095	3	Jacksonville
1096	3	Washington
1097	3	Tennessee
1098	3	Buffalo
1099	3	Baltimore
1100	3	Cincinatti
1101	3	St. Louis
1102	3	Pittsburgh
1103	3	Minnesota
1104	3	Arizona
1105	3	New England
1106	3	Kansas City
1107	3	Miami
1119	6	Oakland
1120	6	Dallas
1121	6	Seattle
1122	6	Cincinnati
1077	3	San Diego
1078	3	Chicago
1079	3	N.Y. Jets
1080	3	Detroit
1081	3	Cleveland
1086	3	Carolina
1087	3	Green Bay
1088	3	Seattle
1089	3	N.Y. Giants
1090	3	New England
1091	3	Philadelphia
1087	5	Green Bay
1123	6	Cleveland
1112	4	Green Bay
1113	3	Detroit
1108	3	Jacksonville
1113	4	Detroit
1114	4	New Orleans
1092	6	Detroit
1093	6	Dallas
1094	6	Seattle
1095	6	N.Y. Giants
1096	6	Indianapolis
1097	6	Houston
1098	6	Buffalo
1099	6	Baltimore
1100	6	Tampa Bay
1101	6	Oakland
1102	6	Pittsburgh
1103	6	Carolina
1104	6	Arizona
1105	6	New England
1106	6	Denver
1107	6	N.Y. Jets
1115	4	New England
1111	3	Miami
1112	3	Green Bay
1092	5	Chicago
1093	5	Dallas
1094	5	Seattle
1095	5	N.Y. Giants
1096	5	Indianapolis
1097	5	Tennessee
1098	5	Buffalo
1099	5	Baltimore
1100	5	Cincinatti
1101	5	St. Louis
1102	5	Pittsburgh
1103	5	Carolina
1104	5	Arizona
1105	5	New England
1106	5	Denver
1107	5	Miami
1116	4	Pittsburgh
1117	4	Baltimore
1118	4	N.Y. Giants
1119	4	Oakland
1120	4	Indianapolis
1121	4	Seattle
1122	4	Denver
1092	4	Chicago
1093	4	Philadelphia
1094	4	Seattle
1095	4	N.Y. Giants
1096	4	Indianapolis
1123	4	Cleveland
1097	4	Houston
1098	4	Buffalo
1099	4	Baltimore
1100	4	Tampa Bay
1101	4	St. Louis
1102	4	Pittsburgh
1103	4	Carolina
1104	4	Atlanta
1120	5	Indianapolis
1108	5	Tennessee
1121	5	Seattle
1105	4	New England
1106	4	Denver
1107	4	Miami
1122	5	Denver
1123	5	Cleveland
1108	6	Tennessee
1109	6	San Francisco
1110	6	Washington
1109	5	San Diego
1110	5	Philadelphia
1111	5	Minnesota
1111	6	Miami
1108	4	Jacksonville
1112	5	Green Bay
1113	5	Detroit
1114	5	Atlanta
1109	4	San Diego
1110	4	Washington
1111	4	Minnesota
1115	5	New England
1118	3	St. Louis
1116	3	Kansas City
1120	3	Dallas
1116	5	Pittsburgh
1117	5	Baltimore
1122	3	Denver
1118	5	N.Y. Giants
1119	5	Oakland
1109	3	San Diego
1110	3	Washington
1117	3	Baltimore
1119	3	Buffalo
1121	3	Arizona
1114	3	Atlanta
1115	3	N.Y. Jets
1123	3	Carolina
1112	6	Tampa Bay
1143	6	Carolina
1140	6	Cleveland
1144	6	Minnesota
1142	6	Miami
1141	6	New England
1139	6	Tennessee
1138	6	Pittsburgh
1145	6	Kansas City
1136	3	Green Bay
1137	3	Houston
1138	3	Pittsburgh
1139	3	Tennessee
1140	3	Baltimore
1141	3	Buffalo
1142	3	N.Y. Jets
1143	3	Atlanta
1144	3	Minnesota
1145	3	San Diego
1146	3	N.Y. Giants
1147	3	Dallas
1148	3	Tampa Bay
1149	3	St. Louis
1150	3	Arizona
1151	3	Denver
1136	5	Green Bay
1137	5	Houston
1138	5	Cincinnati
1139	5	Indianapolis
1140	5	Cleveland
1141	5	Buffalo
1142	5	N.Y. Jets
1143	5	Atlanta
1144	5	Minnesota
1145	5	San Diego
1146	5	N.Y. Giants
1147	5	Washington
1148	5	Tampa Bay
1149	5	Seattle
1150	5	Arizona
1151	5	Oakland
1136	4	Green Bay
1137	4	Houston
1138	4	Pittsburgh
1139	4	Tennessee
1140	4	Baltimore
1141	4	Buffalo
1142	4	Miami
1143	4	Carolina
1144	4	Chicago
1145	4	San Diego
1146	4	N.Y. Giants
1147	4	Washington
1148	4	Tampa Bay
1149	4	Seattle
1150	4	San Francisco
1151	4	Oakland
1136	6	Detroit
1137	6	Houston
1146	6	N.Y. Giants
1147	6	Washington
1148	6	New Orleans
1149	6	St. Louis
1150	6	Arizona
1151	6	Denver
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: jz
--

COPY users (id, name) FROM stdin;
3	Colombo
4	Will
5	Ryan
6	Joe
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: jz
--

SELECT pg_catalog.setval('users_id_seq', 1000, false);


--
-- Name: games_pkey; Type: CONSTRAINT; Schema: public; Owner: jz; Tablespace: 
--

ALTER TABLE ONLY games
    ADD CONSTRAINT games_pkey PRIMARY KEY (id);


--
-- Name: selections_pkey; Type: CONSTRAINT; Schema: public; Owner: jz; Tablespace: 
--

ALTER TABLE ONLY selections
    ADD CONSTRAINT selections_pkey PRIMARY KEY (game_id, user_id);


--
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: jz; Tablespace: 
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: ix_games_week_home; Type: INDEX; Schema: public; Owner: jz; Tablespace: 
--

CREATE UNIQUE INDEX ix_games_week_home ON games USING btree (week, home);


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

