#!/usr/bin/env python3
"""
Read csv file.

generate google search url
export json
"""
import csv
import json
import urllib.parse

# file_excel = "datenbank.xlsx"
file_csv = "datenbank.tsv"
file_json = "datenbank.json"

# header = ("Originalnummer", "Stichworte", "A-Nummern", "Buch", "PostkartenNr")


def gen_url(text: str):
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
with open(file_csv, encoding="utf-8") as fh:
    csv_reader = csv.DictReader(fh, dialect="excel", delimiter="\t")
    for row in csv_reader:

        d = {
            "Originalnummer": row["Originalnummer"],
            "Stichworte": row["Stichworte"],
            "A-Nummern": row["A-Nummern"],
            "Buch": row["Buch"],
            "PostkartenNr": row["PostkartenNr"],
            # "URL": gen_url(row["Stichworte"]),
        }
        list_of_cartoons.append(d)


with open(file_json, mode="w", encoding="utf-8", newline="\n") as fh:
    json.dump(list_of_cartoons, fh, ensure_ascii=False, sort_keys=False, indent=1)
