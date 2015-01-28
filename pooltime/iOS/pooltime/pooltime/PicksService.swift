//
//  PicksService.swift
//  pooltime
//
//  Created by Joe Zirilli on 1/27/15.
//  Copyright (c) 2015 JoCoCo. All rights reserved.
//

import Foundation

struct Game: Printable {
    var id: Int?
    var week: Int?
    var spread: Int?
    var home: String?
    var away: String?
    var homePoints: Int?
    var awayPoints: Int?

    init(gamePayload: NSDictionary) {
        if let _id = gamePayload["id"] as? NSNumber {
            self.id = Int(_id)
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
        if let homePoints = gamePayload["home_points"] as? NSNumber {
            self.homePoints = Int(homePoints)
        }
        if let awayPoints = gamePayload["away_points"] as? NSNumber {
            self.awayPoints = Int(awayPoints)
        }
    }
    
    var description: String {
        return "Week \(week!): \(home!) vs \(away!)"
    }
}
struct Pick {
    var id: Int32
    var gameId: Int32
    var pick: String
}

var picksService = PicksService()

class PicksService {

    func getGamesForWeek(week: Int8, completion: (games: Array<Game>) -> ()) {
        let url = NSURL(string: "http://localhost:5000/games/\(week)")!
        let request = NSURLRequest(URL: url)
        NSURLConnection.sendAsynchronousRequest(request, queue: NSOperationQueue.mainQueue()) {
            (response, data, error) -> Void in
            var jsonError: NSError?
            let gamesPayload: NSArray = NSJSONSerialization.JSONObjectWithData(data, options: nil, error: &jsonError) as NSArray
            var games: Array<Game> = Array<Game>()
            for (i, gamePayload) in enumerate(gamesPayload) {
                var game: Game = Game(gamePayload: gamePayload as NSDictionary)
                games.append(game)
            }
            completion(games: games)
        }
    }
}