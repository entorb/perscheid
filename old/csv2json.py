"""
Read csv file.

generate google search url
export json
"""  # noqa: INP001

import csv
import json
import urllib.parse
from pathlib import Path

# FILE_EXCEL = Path("datenbank.xlsx")
FILE_CSV = Path("datenbank.tsv")
FILE_JSON = Path("datenbank.json")

# cspell:disable-next-line
# header = ("Originalnummer", "Stichworte", "A-Nummern", "Buch", "PostkartenNr")


def gen_url(text: str) -> str:  # noqa: D103
    s = text
    s = s.replace("?", " ")
    s = s.replace(".", " ")
    s = s.replace(",", " ")
    s = s.replace("!", " ")
    s = s.replace("-", " ")
    s = s.replace("/", " ")
    s = s.strip()  # trim spaces from both sides, rstrip for right only

    # replace all (multiple) whitespaces by single space ' '
    s = " ".join(s.split())

    # url encoding of special chars
    s = urllib.parse.quote_plus(s)
    # print(s)

    url = f"https://www.google.de/search?q=Perscheid+{s}&hl=de&tbm=isch"
    return url


list_of_cartoons = []

# note: utf-8-sig for UTF-8-BOM (as generated via Excel CSV export)
with FILE_CSV.open(encoding="utf-8") as fh:
    csv_reader = csv.DictReader(fh, dialect="excel", delimiter="\t")
    for row in csv_reader:
        d = {
            # cspell:disable
            "Originalnummer": row["Originalnummer"],
            "Stichworte": row["Stichworte"],
            "A-Nummern": row["A-Nummern"],
            "Buch": row["Buch"],
            "PostkartenNr": row["PostkartenNr"],
            # "URL": gen_url(row["Stichworte"]),
            # cspell:enable
        }
        list_of_cartoons.append(d)


with FILE_JSON.open(mode="w", encoding="utf-8", newline="\n") as fh:
    json.dump(list_of_cartoons, fh, ensure_ascii=False, sort_keys=False, indent=1)
