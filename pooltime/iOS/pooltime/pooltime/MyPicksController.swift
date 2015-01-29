//
//  MyPicksController
//  pooltime
//
//  Created by Joe Zirilli on 1/27/15.
//  Copyright (c) 2015 JoCoCo. All rights reserved.
//

import UIKit

class MyPicksController: UIViewController, UITableViewDelegate, UITableViewDataSource, PicksDelegate {
    
    var games: Array<Game>?
    var picks: Picks?

    @IBOutlet weak var picksTableView: UITableView!

    override func viewDidLoad() {
        super.viewDidLoad()
        let picksService = PicksService()
        picksService.delegate = self
        picksService.getGamesForWeek(1)
        picksService.getPicksForWeek(1)
        let nib = UINib(nibName: "MyPicksTableViewCell", bundle: nil)
        picksTableView.registerNib(nib, forCellReuseIdentifier: "myPicksCell")
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }
    
    func gamesWereRetrieved(games: Array<Game>) {
        self.games = games
        picksTableView.reloadData()
    }
    
    func picksWereRetrieved(picks: Picks) {
        self.picks = picks
        if games != nil {
            picksTableView.reloadData()
        }
    }
    
    func pickWasUpdated(pick: Pick) {
        
    }
    
    func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        if let count = games?.count {
            return count
        } else {
            return 0
        }
    }
    
    func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        if let game: Game = self.games?[indexPath.row] {
            if let cell = self.picksTableView.dequeueReusableCellWithIdentifier("myPicksCell", forIndexPath: indexPath) as? MyPicksTableViewCell {
                if let pick = picks?[game.id!] {
                    cell.load(game, pick: pick)
                }
                return cell
            }
        }
        return UITableViewCell(style: UITableViewCellStyle.Default, reuseIdentifier: "myPicksCell")
    }

}

