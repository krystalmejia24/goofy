package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/http/httputil"
	"time"

	"github.com/gorilla/mux"
)

// Payload is what the vod module is expecting
type Payload struct {
	PlaylistType    string     `json:"playlistType"`
	Discontinuity   bool       `json:"discontinuity"`
	SegmentBaseTime int64      `json:"segmentBaseTime"`
	FirstClipTime   int64      `json:"firstClipTime"`
	Durations       []int      `json:"durations"`
	Sequences       []Sequence `json:"sequences"`
}

// Clip represents a single media file.
type Clip struct {
	Type string `json:"type"`
	Path string `json:"path"`
}

// Sequences represents a collection of clips
type Sequence struct {
	Clips    []Clip `json:"clips"`
	Language string `json:"language"`
}

func handler(w http.ResponseWriter, r *http.Request) {
	requestDump, err := httputil.DumpRequest(r, true)
	if err != nil {
		fmt.Println(err)
	}

	log.Printf("%q", requestDump)

	firstClipTime, _ := time.Parse(time.RFC3339, "2020-03-09T01:21:00+00:00")
	segmentBaseTime, _ := time.Parse(time.RFC3339, "2020-03-09T01:20:00+00:00")

	example := Payload{
		PlaylistType:    "live",
		Discontinuity:   false,
		SegmentBaseTime: segmentBaseTime.Unix() * 1000,
		FirstClipTime:   firstClipTime.Unix() * 1000,
		Durations:       []int{120000, 120000, 120000},
		Sequences: []Sequence{
			Sequence{
				Language: "eng",
				Clips: []Clip{
					Clip{
						Type: "source",
						Path: "/files/startrek.mp4",
					},
					Clip{
						Type: "source",
						Path: "/files/goodfight.mp4",
					},
					Clip{
						Type: "source",
						Path: "/files/nfl.mp4",
					},
				},
			},
		},
	}
	w.Header().Add("Content-Type", "application/json")
	j, _ := json.Marshal(example)
	w.Write(j)
}

func main() {
	rtr := mux.NewRouter()
	rtr.PathPrefix("/").HandlerFunc(handler)

	http.Handle("/", rtr)

	log.Println("Listening!")
	http.ListenAndServe(":2828", nil)
}
