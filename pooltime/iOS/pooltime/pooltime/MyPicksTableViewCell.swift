//
//  MyPicksTableViewCell.swift
//  pooltime
//
//  Created by Joe Zirilli on 1/28/15.
//  Copyright (c) 2015 JoCoCo. All rights reserved.
//

import UIKit

class MyPicksTableViewCell: UITableViewCell {
    @IBOutlet weak var spread: UILabel!
    @IBOutlet weak var home: UILabel!
    @IBOutlet weak var away: UILabel!
    
    func loadFromGame(game: Game) {
        spread.text = "\(game.spread!)"
        home.text = game.home
        away.text = game.away
    }
}
