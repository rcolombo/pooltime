//
//  MyPicksTableViewCell.swift
//  pooltime
//
//  Created by Joe Zirilli on 1/28/15.
//  Copyright (c) 2015 JoCoCo. All rights reserved.
//

import UIKit

class MyPicksTableViewCell: UITableViewCell, UIGestureRecognizerDelegate {

    var game: Game!
    var pick: Pick!

    @IBOutlet weak var spread: UILabel!
    @IBOutlet weak var home: UILabel!
    @IBOutlet weak var away: UILabel!

//    @IBAction func didTapHome(sender: UITapGestureRecognizer) {
//    }
    
    func load(game: Game, pick: Pick) {
        self.game = game
        self.pick = pick
        updateLabels()
        updateColors()
    }
    
    private func updateLabels() {
        spread.text = "\(game.spread!)"
        home.text = game.home
        away.text = game.away
    }
    
    func updateColors() {
        var color: UIColor
        if let correctTeam = game.correctTeam {
            if correctTeam == pick.team {
                color = UIColor(red: 0, green: 0.7, blue: 0, alpha: 1)
            } else {
                color = UIColor(red: 0.7, green: 0, blue: 0, alpha: 1)
            }
        } else {
            color = UIColor(red: 0, green: 0, blue: 0.7, alpha: 1)
        }
        if pick.team == game.home {
            home.textColor = color
        } else {
            away.textColor = color
        }
    }
}
