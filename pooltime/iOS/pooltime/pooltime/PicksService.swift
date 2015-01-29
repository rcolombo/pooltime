//
//  PicksService.swift
//  pooltime
//
//  Created by Joe Zirilli on 1/27/15.
//  Copyright (c) 2015 JoCoCo. All rights reserved.
//

import Foundation

class Game: Printable {
    var id: Int?
    var week: Int?
    var spread: Int?
    var home: String?
    var away: String?
    var homeScore: Int?
    var awayScore: Int?

    init(gamePayload: NSDictionary) {
        if let id = gamePayload["id"] as? NSNumber {
            self.id = Int(id)
        }
        if let week = gamePayload["week"] as? NSNumber {
            self.week = Int(week)
        }
        if let spread = gamePayload["spread"] as? NSNumber {
            self.spread = Int(spread)
        }
        if let home = gamePayload["home"] as? NSString {
            self.home = home
        }
        if let away = gamePayload["away"] as? NSString {
            self.away = away
        }
        if let homeScore = gamePayload["home_score"] as? NSNumber {
            self.homeScore = Int(homeScore)
        }
        if let awayScore = gamePayload["away_score"] as? NSNumber {
            self.awayScore = Int(awayScore)
        }
    }
    
    var correctTeam: String? {
        if homeScore != nil && awayScore != nil {
            if homeScore! + spread! > awayScore! {
                return home!
            } else {
                return away!
            }
        }
        return nil
    }
    
    var description: String {
        return "Week \(week!): \(home!) vs \(away!)"
    }
}

class Pick {
    var id: Int?
    var gameId: Int?
    var team: String?
    
    init(pickPayload: NSDictionary) {
        if let id = pickPayload["id"] as? NSNumber {
            self.id = Int(id)
        }
        if let gameId = pickPayload["game_id"] as? NSNumber {
            self.gameId = Int(gameId)
        }
        if let team = pickPayload["team"] as? NSString {
            self.team = team
        }
    }
}

class Picks {
    var dict = Dictionary<Int, Pick>()
    
    subscript(gameId: Int) -> Pick? {
        get {
            return dict[gameId]
        }
        set(newPick) {
            dict[gameId] = newPick
        }
    }
}

let username = "Joe"

protocol PicksDelegate {
    func gamesWereRetrieved(games: Array<Game>)
    
    func picksWereRetrieved(picks: Picks)
    
    func pickWasUpdated(pick: Pick)
}

protocol PicksDataSource {
    var games: Array<Game> { get set }
    var picks: Picks { get set }
}

class PicksService {
    
    var delegate: PicksDelegate?
    
    init() {}

    func getGamesForWeek(week: Int) {
        let url = NSURL(string: "http://localhost:5000/games/\(week)")!
        let request = NSURLRequest(URL: url)
        NSURLConnection.sendAsynchronousRequest(request, queue: NSOperationQueue.mainQueue()) {
            (response, data, error) -> Void in
            var jsonError: NSError?
            let gamesPayload: NSArray = NSJSONSerialization.JSONObjectWithData(data, options: nil, error: &jsonError) as NSArray
            if jsonError == nil {
                var games: Array<Game> = Array<Game>()
                for (i, gamePayload) in enumerate(gamesPayload) {
                    var game: Game = Game(gamePayload: gamePayload as NSDictionary)
                    games.append(game)
                }
                self.delegate?.gamesWereRetrieved(games)
            }
        }
    }
    
    func getPicksForWeek(week: Int8) {
        let url = NSURL(string: "http://localhost:5000/picks/\(week)")!
        let request = NSURLRequest(URL: url)
        NSURLConnection.sendAsynchronousRequest(request, queue: NSOperationQueue.mainQueue()) {
            (response, data, error) -> Void in
            var jsonError: NSError?
            let picksPayload: NSDictionary = NSJSONSerialization.JSONObjectWithData(data, options: nil, error: &jsonError) as NSDictionary
            if jsonError == nil {
                if let myPicksPayload: NSArray = picksPayload[username] as? NSArray {
                    var picks = Picks()
                    for (i, pickPayload) in enumerate(myPicksPayload as NSArray) {
                        var pick = Pick(pickPayload: pickPayload as NSDictionary)
                        picks[pick.gameId!] = pick
                    }
                    self.delegate?.picksWereRetrieved(picks)
                }
            }
        }
    }
    
    func updatePicks(picks: Picks) {
        let url = NSURL(string: "http://localhost:5000/picks")!
        let request: NSMutableURLRequest = NSMutableURLRequest(URL: url)
        request.HTTPMethod = "PUT"

        var jsonError: NSError?
        let picksPayload = NSJSONSerialization.dataWithJSONObject(picks, options: nil, error: &jsonError)
        request.HTTPBody = picksPayload
        NSURLConnection.sendAsynchronousRequest(request, queue: NSOperationQueue.mainQueue()) {(response, data, error) in
        }
    }
}